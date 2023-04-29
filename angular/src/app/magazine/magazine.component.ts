import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MagazineService, MagazineDto } from '@proxy/magazines';
import { CreateUpdateMagazineDto, LibraryItemType, libraryItemTypeOptions } from '@proxy/library-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { libraryItemAvailabilityOptions } from '@proxy/library-items';

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

  libraryItemAvailability = libraryItemAvailabilityOptions;

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

  notAvailable(id: string) {
    const magazine = this.magazineService.get(id).subscribe(magazine => {
      const updatedmagazine: CreateUpdateMagazineDto = {
        title: magazine.title,
        issn: magazine.issn,
        publisher: magazine.publisher,
        publicationDate: magazine.publicationDate,
        type: magazine.type,
        issueNumber: magazine.issueNumber,
        availability: 1,
      };
      this.magazineService.update(id, updatedmagazine).subscribe(() => {
        window.location.reload();
      });
    });
  }

  Available(id: string) {
    const magazine = this.magazineService.get(id).subscribe(magazine => {
      const updatedmagazine: CreateUpdateMagazineDto = {
        title: magazine.title,
        issn: magazine.issn,
        publisher: magazine.publisher,
        publicationDate: magazine.publicationDate,
        type: magazine.type,
        issueNumber: magazine.issueNumber,
        availability: 0,
      };
      this.magazineService.update(id, updatedmagazine).subscribe(() => {
        window.location.reload();
      });
    });
  }

  editMagazine(id: string) {
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
      publicationDate: [null, Validators.required],
      type: [LibraryItemType.Magazine],
      publisher: [null, Validators.required],
      issn: [null, Validators.required],
      issueNumber: [null, Validators.required],
      availability: [null, Validators.required],
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
