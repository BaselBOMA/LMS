import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { DvdService, DvdDto } from '@proxy/dvds';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.scss'],
  providers: [ListService],
})
export class DvdComponent implements OnInit {
  dvd = { items: [], totalCount: 0 } as PagedResultDto<DvdDto>;

  constructor(public readonly list: ListService, private dvdService: DvdService) {}

  ngOnInit() {
    const dvdStreamCreator = (query) => this.dvdService.getList(query);

    this.list.hookToQuery(dvdStreamCreator).subscribe((response) => {
      this.dvd = response;
    });
  }
}
