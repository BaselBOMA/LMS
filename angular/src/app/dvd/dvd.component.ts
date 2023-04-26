import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DvdService, DvdDto } from '@proxy/dvds';
import { libraryItemTypeOptions } from '@proxy/library-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.scss'],
  providers: [ListService, { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class DvdComponent implements OnInit {
  dvd = { items: [], totalCount: 0 } as PagedResultDto<DvdDto>;

  searchTerm: string = '';

  get filteredItems(): any[] {
    if (!this.searchTerm) {
      return this.dvd.items;
    }

    return this.dvd.items.filter((item: any) => {
      return (
        item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 ||
        (item.publicationDate &&
          item.publicationDate.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
      );
    });
  }

  selectedDvd = {} as DvdDto;

  form: FormGroup;

  libraryItemTypes = libraryItemTypeOptions;

  isModalOpen = false;

  constructor(
    public readonly list: ListService,
    private dvdService: DvdService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {}

  ngOnInit() {
    const dvdStreamCreator = query => this.dvdService.getList(query);

    this.list.hookToQuery(dvdStreamCreator).subscribe(response => {
      this.dvd = response;
    });
  }

  createDvd() {
    this.selectedDvd = {} as DvdDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  editDvd(id: string) {
    this.dvdService.get(id).subscribe(dvd => {
      this.selectedDvd = dvd;
      this.buildForm();
      this.isModalOpen = true;
    });
  }

  delete(id: string) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreYouSure').subscribe(status => {
      if (status === Confirmation.Status.confirm) {
        this.dvdService.delete(id).subscribe(() => this.list.get());
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: [null, Validators.required],
      publicationDate: [null, Validators.required],
      publisher: [null, Validators.required],
      language: [null, Validators.required],
      duration: [null, Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    const request = this.selectedDvd.id
      ? this.dvdService.update(this.selectedDvd.id, this.form.value)
      : this.dvdService.create(this.form.value);

    request.subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    });
  }
}
