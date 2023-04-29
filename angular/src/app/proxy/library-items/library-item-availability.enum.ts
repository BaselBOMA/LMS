import { mapEnumToOptions } from '@abp/ng.core';

export enum LibraryItemAvailability {
  Available = 0,
  NotAvailable = 1,
  CheckedOut = 2,
  Reserved = 3,
}

export const libraryItemAvailabilityOptions = mapEnumToOptions(LibraryItemAvailability);
