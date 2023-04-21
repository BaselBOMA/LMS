import type { LibraryItemDto } from '../library-items/models';

export interface BookDto extends LibraryItemDto {
  author?: string;
  pages: number;
}
