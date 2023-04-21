import type { LibraryItemDto } from '../library-items/models';

export interface MagazineDto extends LibraryItemDto {
  issn?: string;
  issueNumber: number;
}
