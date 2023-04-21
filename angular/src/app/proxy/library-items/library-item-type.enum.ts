import { mapEnumToOptions } from '@abp/ng.core';

export enum LibraryItemType {
  Book = 0,
  Magazine = 1,
  Dvd = 2,
}

export const libraryItemTypeOptions = mapEnumToOptions(LibraryItemType);
