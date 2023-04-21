import type { DvdDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateDvdDto } from '../library-items/models';

@Injectable({
  providedIn: 'root',
})
export class DvdService {
  apiName = 'Default';
  

  create = (input: CreateUpdateDvdDto) =>
    this.restService.request<any, DvdDto>({
      method: 'POST',
      url: '/api/app/dvd',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/dvd/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, DvdDto>({
      method: 'GET',
      url: `/api/app/dvd/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<DvdDto>>({
      method: 'GET',
      url: '/api/app/dvd',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdateDvdDto) =>
    this.restService.request<any, DvdDto>({
      method: 'PUT',
      url: `/api/app/dvd/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
