import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DvdService, DvdDto } from '@proxy/dvds';
import {
  CreateUpdateDvdDto,
  LibraryItemAvailability,
  LibraryItemType,
  libraryItemAvailabilityOptions,
  libraryItemTypeOptions,
} from '@proxy/library-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, Confirmation } from '@abp/ng.theme.shared';
import { CreateCheckoutDto } from '../CreateCheckoutDto';
import { CreateReserveDto } from '../CreateReserveDto';

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

  libraryItemAvailability = libraryItemAvailabilityOptions;

  isModalOpen = false;

  isCheckOutModalOpen = false;

  isReserveModalOpen = false;

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

  CheckOutDvd = (id: string, input: CreateCheckoutDto) => {
    this.dvdService.get(id).subscribe(dvd => {
      this.selectedDvd = dvd;
      this.buildCheckOutForm();
      this.isCheckOutModalOpen = true;
    });
  };

  createDvd() {
    this.selectedDvd = {} as DvdDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  ReserveDvd(id: string, input: CreateReserveDto) {
    this.dvdService.get(id).subscribe(dvd => {
      this.selectedDvd = dvd;
      this.buildReserveForm();
      this.isReserveModalOpen = true;
    });
  }

  notAvailable(id: string) {
    const dvd = this.dvdService.get(id).subscribe(dvd => {
      const updateddvd: CreateUpdateDvdDto = {
        title: dvd.title,
        duration: dvd.duration,
        publisher: dvd.publisher,
        publicationDate: dvd.publicationDate,
        type: dvd.type,
        language: dvd.language,
        availability: 1,
        notes: 'NA',
      };
      this.dvdService.update(id, updateddvd).subscribe(() => {
        window.location.reload();
      });
    });
  }

  Available(id: string) {
    const dvd = this.dvdService.get(id).subscribe(dvd => {
      const updateddvd: CreateUpdateDvdDto = {
        title: dvd.title,
        duration: dvd.duration,
        publisher: dvd.publisher,
        publicationDate: dvd.publicationDate,
        type: dvd.type,
        language: dvd.language,
        availability: 0,
        notes: 'None',
      };
      this.dvdService.update(id, updateddvd).subscribe(() => {
        window.location.reload();
      });
    });
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
      type: [LibraryItemType.Dvd],
      publicationDate: [null, Validators.required],
      publisher: [null, Validators.required],
      language: [null, Validators.required],
      duration: [null, Validators.required],
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
    const checkedOutdvd = this.dvd.items.find(dvd => dvd.id === this.selectedDvd.id);
    if (checkedOutdvd) {
      checkedOutdvd.availability = LibraryItemAvailability.CheckedOut;
      checkedOutdvd.notes = `This Dvd Is Checked Out By ${input.customerName} For ${input.daysToCheckout} Days`;
      const updateInput: CreateUpdateDvdDto = {
        title: checkedOutdvd.title,
        language: checkedOutdvd.language,
        type: checkedOutdvd.type,
        notes: checkedOutdvd.notes,
        availability: checkedOutdvd.availability,
        publicationDate: checkedOutdvd.publicationDate,
        publisher: checkedOutdvd.publisher,
        duration: checkedOutdvd.duration,
      };
      this.isCheckOutModalOpen = false;
      const dvd = this.dvdService.get(this.selectedDvd.id).subscribe(dvd => {
        this.dvdService.update(this.selectedDvd.id, updateInput).subscribe(() => {
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

    const reservedDvd = this.dvd.items.find(dvd => dvd.id === this.selectedDvd.id);

    if (reservedDvd) {
      const newNotes = `${reservedDvd.notes}<br>This Dvd Is Reserved By ${input.reserver}`;
      if (reservedDvd.availability === LibraryItemAvailability.CheckedOut) {
        reservedDvd.notes = newNotes;
        reservedDvd.availability = LibraryItemAvailability.Reserved;
      } else {
        reservedDvd.notes = `This Dvd Is Reserved By ${input.reserver}`;
        reservedDvd.availability = LibraryItemAvailability.Reserved;
      }

      const updateInput: CreateUpdateDvdDto = {
        title: reservedDvd.title,
        language: reservedDvd.language,
        type: reservedDvd.type,
        notes: reservedDvd.notes,
        availability: reservedDvd.availability,
        publicationDate: reservedDvd.publicationDate,
        publisher: reservedDvd.publisher,
        duration: reservedDvd.duration,
      };

      this.isReserveModalOpen = false;

      const dvd = this.dvdService.get(this.selectedDvd.id).subscribe(dvd => {
        this.dvdService.update(this.selectedDvd.id, updateInput).subscribe(() => {
          window.location.reload();
        });
      });
    }
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
