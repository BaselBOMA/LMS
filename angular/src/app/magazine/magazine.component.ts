import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MagazineService, MagazineDto } from '@proxy/magazines';
import { libraryItemTypeOptions } from '@proxy/library-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class MagazineComponent implements OnInit {
  magazine = { items: [], totalCount: 0 } as PagedResultDto<MagazineDto>;

  searchTerm: string = '';

  get filteredItems(): any[] {
    if (!this.searchTerm) {
      return this.magazine.items;
    }

    return this.magazine.items.filter((item: any) => {
      return (
        item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 ||
        (item.publicationDate &&
          item.publicationDate.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
      );
    });
  }

  selectedMagazine = {} as MagazineDto;

  form: FormGroup;

  libraryItemTypes = libraryItemTypeOptions;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private magazineService: MagazineService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const magazineStreamCreator = query => this.magazineService.getList(query);

    this.list.hookToQuery(magazineStreamCreator).subscribe(response => {
      this.magazine = response;
    });
  }

  createMagazine() {
    this.selectedMagazine = {} as MagazineDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editBook(id: string) {
    this.magazineService.get(id).subscribe(magazine => {
      this.selectedMagazine = magazine;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.magazineService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: [null, Validators.required],
      publicationDate: [null, Validators.required],
      publisher: [null, Validators.required],
      issn: [null, Validators.required],
      issueNumber: [null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedMagazine.id
      ? this.magazineService.update(this.selectedMagazine.id, this.form.value)
      : this.magazineService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
}
