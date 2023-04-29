import type { LibraryItemType } from './library-item-type.enum';
import type { LibraryItemAvailability } from './library-item-availability.enum';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateLibraryItemDto {
  title: string;
  type: LibraryItemType;
  publicationDate: string;
  publisher: string;
  availability: LibraryItemAvailability;
}

export interface LibraryItemDto extends AuditedEntityDto<string> {
  title?: string;
  type: LibraryItemType;
  publicationDate?: string;
  publisher?: string;
  availability: LibraryItemAvailability;
}

export interface CreateUpdateBookDto extends CreateUpdateLibraryItemDto {
  author: string;
  pages: number;
}

export interface CreateUpdateDvdDto extends CreateUpdateLibraryItemDto {
  language: string;
  duration: number;
}

export interface CreateUpdateMagazineDto extends CreateUpdateLibraryItemDto {
  issn: string;
  issueNumber: number;
}
