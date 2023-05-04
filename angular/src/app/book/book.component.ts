import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import {
  CreateUpdateBookDto,
  LibraryItemAvailability,
  libraryItemTypeOptions,
} from '@proxy/library-items';
import { libraryItemAvailabilityOptions } from '@proxy/library-items';
import { BookService, BookDto } from '@proxy/books';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { CreateCheckoutDto } from '../CreateCheckoutDto';
import { CreateReserveDto } from '../CreateReserveDto';

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

  isCheckOutModalOpen = false;

  isReserveModalOpen = false;

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

  CheckOutBook = (id: string, input: CreateCheckoutDto) => {
    this.bookService.get(id).subscribe(book => {
      this.selectedBook = book;
      this.buildCheckOutForm();
      this.isCheckOutModalOpen = true;
    });
  };

  ReserveBook(id: string, input: CreateReserveDto) {
    this.bookService.get(id).subscribe(book => {
      this.selectedBook = book;
      this.buildReserveForm();
      this.isReserveModalOpen = true;
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
        notes: 'NA',
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
        notes: 'None',
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
      publicationDate: [
        this.selectedBook.publicationDate ? new Date(this.selectedBook.publicationDate) : null,
        Validators.required,
      ],
      publisher: [null, Validators.required],
      author: [null, Validators.required],
      pages: [null, Validators.required],
      availability: [null, Validators.required],
      notes: ['', Validators.required],
    });
  }

  buildCheckOutForm() {
    this.form = this.fb.group({
      daysToCheckout: [null, [Validators.required, Validators.min(1)]],
      customerName: [null, [Validators.required]],
    });
  }

  buildReserveForm() {
    this.form = this.fb.group({
      reserver: [null, Validators.required],
      reserverEmail: [null, [Validators.required, Validators.email]],
    });
  }

  submitForm = () => {
    if (this.form.invalid) {
      return;
    }
    const input = this.form.getRawValue() as CreateCheckoutDto;
    const checkedOutBook = this.book.items.find(book => book.id === this.selectedBook.id);
    if (checkedOutBook) {
      checkedOutBook.availability = LibraryItemAvailability.CheckedOut;
      checkedOutBook.notes = `This Book Is Checked Out By ${input.customerName} For ${input.daysToCheckout} Days`;
      const updateInput: CreateUpdateBookDto = {
        title: checkedOutBook.title,
        author: checkedOutBook.author,
        type: checkedOutBook.type,
        notes: checkedOutBook.notes,
        availability: checkedOutBook.availability,
        publicationDate: checkedOutBook.publicationDate,
        publisher: checkedOutBook.publisher,
        pages: checkedOutBook.pages,
      };
      this.isCheckOutModalOpen = false;
      const book = this.bookService.get(this.selectedBook.id).subscribe(book => {
        this.bookService.update(this.selectedBook.id, updateInput).subscribe(() => {
          window.location.reload();
        });
      });
    }
  };

  isReserveButtonDisabled(row: any): boolean {
    return row.availability !== LibraryItemAvailability.CheckedOut;
  }

  submitReserveForm() {
    if (this.form.invalid) {
      return;
    }
  
    const input = this.form.getRawValue() as CreateReserveDto;
  
    const reservedBook = this.book.items.find(book => book.id === this.selectedBook.id);
  
    if (reservedBook) {
      const newNotes = `${reservedBook.notes}<br>The Book Is Reserved By ${input.reserver}`;
  
      if (reservedBook.availability === LibraryItemAvailability.CheckedOut) {
        reservedBook.notes = newNotes;
        reservedBook.availability = LibraryItemAvailability.Reserved;
      } else {
        reservedBook.notes = `This Book Is Reserved By ${input.reserver}`;
        reservedBook.availability = LibraryItemAvailability.Reserved;
      }
  
      const updateInput: CreateUpdateBookDto = {
        title: reservedBook.title,
        author: reservedBook.author,
        type: reservedBook.type,
        notes: reservedBook.notes,
        availability: reservedBook.availability,
        publicationDate: reservedBook.publicationDate,
        publisher: reservedBook.publisher,
        pages: reservedBook.pages,
      };
  
      this.isReserveModalOpen = false;
  
      const book = this.bookService.get(this.selectedBook.id).subscribe(book => {
        this.bookService.update(this.selectedBook.id, updateInput).subscribe(() => {
          window.location.reload();
        });
      });
    }
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
