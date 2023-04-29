import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CreateUpdateBookDto, libraryItemTypeOptions } from '@proxy/library-items';
import { libraryItemAvailabilityOptions } from '@proxy/library-items';
import { BookService, BookDto } from '@proxy/books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class BookComponent implements OnInit {
  book = { items: [], totalCount: 0 } as PagedResultDto<BookDto>;

  searchTerm: string = '';

  get filteredItems(): any[] {
    if (!this.searchTerm) {
      return this.book.items;
    }

    return this.book.items.filter((item: any) => {
      return (
        item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 ||
        item.author.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 ||
        (item.publicationDate &&
          item.publicationDate.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
      );
    });
  }

  selectedBook = {} as BookDto;

  form: FormGroup;

  libraryItemTypes = libraryItemTypeOptions;

  libraryItemAvailability = libraryItemAvailabilityOptions;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private bookService: BookService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const bookStreamCreator = query => this.bookService.getList(query);

    this.list.hookToQuery(bookStreamCreator).subscribe(response => {
      this.book = response;
    });
  }

  createBook() {
    this.selectedBook = {} as BookDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  notAvailable(id: string) {
    const book = this.bookService.get(id).subscribe(book => {
      const updatedBook: CreateUpdateBookDto = {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publicationDate: book.publicationDate,
        type: book.type,
        pages: book.pages,
        availability: 1,
      };
      this.bookService.update(id, updatedBook).subscribe(() => {
        window.location.reload();
      });
    });
  }

  Available(id: string) {
    const book = this.bookService.get(id).subscribe(book => {
      const updatedBook: CreateUpdateBookDto = {
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        publicationDate: book.publicationDate,
        type: book.type,
        pages: book.pages,
        availability: 0,
      };
      this.bookService.update(id, updatedBook).subscribe(() => {
        window.location.reload();
      });
    });
  }

  editBook(id: string) {
    this.bookService.get(id).subscribe(book => {
      this.selectedBook = book;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.bookService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      publicationDate: [null, Validators.required],
      publisher: [null, Validators.required],
      author: [null, Validators.required],
      pages: [null, Validators.required],
      availability: [null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedBook.id
      ? this.bookService.update(this.selectedBook.id, this.form.value)
      : this.bookService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
}
