import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MagazineService, MagazineDto } from '@proxy/magazines';
import {
  CreateUpdateMagazineDto,
  LibraryItemAvailability,
  LibraryItemType,
  libraryItemTypeOptions,
} from '@proxy/library-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { libraryItemAvailabilityOptions } from '@proxy/library-items';
import { CreateCheckoutDto } from '../CreateCheckoutDto';
import { CreateReserveDto } from '../CreateReserveDto';

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

  isCheckOutModalOpen = false;

  isReserveModalOpen = false;

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

  CheckOutMagazine = (id: string, input: CreateCheckoutDto) => {
    this.magazineService.get(id).subscribe(magazine => {
      this.selectedMagazine = magazine;
      this.buildCheckOutForm();
      this.isCheckOutModalOpen = true;
    });
  };

  ReserveMagazine(id: string, input: CreateReserveDto) {
    this.magazineService.get(id).subscribe(magazine => {
      this.selectedMagazine = magazine;
      this.buildReserveForm();
      this.isReserveModalOpen = true;
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
        notes: 'NA',
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
        notes: 'None',
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
    const checkedOutmagazine = this.magazine.items.find(
      magazine => magazine.id === this.selectedMagazine.id
    );
    if (checkedOutmagazine) {
      checkedOutmagazine.availability = LibraryItemAvailability.CheckedOut;
      checkedOutmagazine.notes = `This Magazine Is Checked Out By ${input.customerName} For ${input.daysToCheckout} Days`;
      const updateInput: CreateUpdateMagazineDto = {
        title: checkedOutmagazine.title,
        issn: checkedOutmagazine.issn,
        type: checkedOutmagazine.type,
        notes: checkedOutmagazine.notes,
        availability: checkedOutmagazine.availability,
        publicationDate: checkedOutmagazine.publicationDate,
        publisher: checkedOutmagazine.publisher,
        issueNumber: checkedOutmagazine.issueNumber,
      };
      this.isCheckOutModalOpen = false;
      const magazine = this.magazineService.get(this.selectedMagazine.id).subscribe(magazine => {
        this.magazineService.update(this.selectedMagazine.id, updateInput).subscribe(() => {
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

    const reservedMagazine = this.magazine.items.find(
      magazine => magazine.id === this.selectedMagazine.id
    );

    if (reservedMagazine) {
      const newNotes = `${reservedMagazine.notes}<br>This Magazine Is Reserved By ${input.reserver}`;
      if (reservedMagazine.availability === LibraryItemAvailability.CheckedOut) {
        reservedMagazine.notes = newNotes;
        reservedMagazine.availability = LibraryItemAvailability.Reserved;
      } else {
        reservedMagazine.notes = `This Magazine Is Reserved By ${input.reserver}`;
        reservedMagazine.availability = LibraryItemAvailability.Reserved;
      }

      const updateInput: CreateUpdateMagazineDto = {
        title: reservedMagazine.title,
        issn: reservedMagazine.issn,
        type: reservedMagazine.type,
        notes: reservedMagazine.notes,
        availability: reservedMagazine.availability,
        publicationDate: reservedMagazine.publicationDate,
        publisher: reservedMagazine.publisher,
        issueNumber: reservedMagazine.issueNumber,
      };

      this.isReserveModalOpen = false;

      const magazine = this.magazineService.get(this.selectedMagazine.id).subscribe(magazine => {
        this.magazineService.update(this.selectedMagazine.id, updateInput).subscribe(() => {
          window.location.reload();
        });
      });
    }
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
