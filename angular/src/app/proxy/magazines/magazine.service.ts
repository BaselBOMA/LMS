import type { MagazineDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateUpdateMagazineDto } from '../library-items/models';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  apiName = 'Default';
  

  create = (input: CreateUpdateMagazineDto) =>
    this.restService.request<any, MagazineDto>({
      method: 'POST',
      url: '/api/app/magazine',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/magazine/${id}`,
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, MagazineDto>({
      method: 'GET',
      url: `/api/app/magazine/${id}`,
    },
    { apiName: this.apiName });
  

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<MagazineDto>>({
      method: 'GET',
      url: '/api/app/magazine',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  update = (id: string, input: CreateUpdateMagazineDto) =>
    this.restService.request<any, MagazineDto>({
      method: 'PUT',
      url: `/api/app/magazine/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
