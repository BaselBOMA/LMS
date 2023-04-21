import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { MagazineService, MagazineDto } from '@proxy/magazines';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.scss'],
  providers: [ListService],
})
export class MagazineComponent implements OnInit {
  magazine = { items: [], totalCount: 0 } as PagedResultDto<MagazineDto>;

  constructor(public readonly list: ListService, private magazineService: MagazineService) {}

  ngOnInit() {
    const magazineStreamCreator = (query) => this.magazineService.getList(query);

    this.list.hookToQuery(magazineStreamCreator).subscribe((response) => {
      this.magazine = response;
    });
  }
}
