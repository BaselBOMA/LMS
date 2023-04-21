import type { LibraryItemDto } from '../library-items/models';

export interface DvdDto extends LibraryItemDto {
  language?: string;
  duration: number;
}
