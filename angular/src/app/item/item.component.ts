import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { LibraryItemService, LibraryItemDto } from '@proxy/library-items';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ListService],
})
export class LibraryItemComponent implements OnInit {
  item = { items: [], totalCount: 0 } as PagedResultDto<LibraryItemDto>;

  constructor(public readonly list: ListService, private LibraryItemService: LibraryItemService) {}

  ngOnInit() {
    const libraryItemStreamCreator = (query) => this.LibraryItemService.getList(query);

    this.list.hookToQuery(libraryItemStreamCreator).subscribe((response) => {
      this.item = response;
    });
  }
}
