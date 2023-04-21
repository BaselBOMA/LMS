import type { CreateUpdateLibraryItemDto, LibraryItemDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LibraryItemService {
  apiName = 'Default';
  

  create = (input: CreateUpdateLibraryItemDto) =>
    this.restService.request<any, LibraryItemDto>({
      method: 'POST',
      url: '/api/app/library-item',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/library-item/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, LibraryItemDto>({
      method: 'GET',
      url: `/api/app/library-item/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<LibraryItemDto>>({
      method: 'GET',
      url: '/api/app/library-item',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdateLibraryItemDto) =>
    this.restService.request<any, LibraryItemDto>({
      method: 'PUT',
      url: `/api/app/library-item/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
