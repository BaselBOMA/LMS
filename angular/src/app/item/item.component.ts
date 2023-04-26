import { ListService, PagedResultDto } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { LibraryItemService, LibraryItemDto } from '@proxy/library-items';
import { libraryItemTypeOptions } from '@proxy/library-items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateNativeAdapter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ListService],
})
export class LibraryItemComponent implements OnInit {
  item = { items: [], totalCount: 0 } as PagedResultDto<LibraryItemDto>;

  searchTerm: string = '';

  get filteredItems(): any[] {
    if (!this.searchTerm) {
      return this.item.items;
    }

    return this.item.items.filter((item: any) => {
      return (
        item.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1 ||
        (item.publicationDate &&
          item.publicationDate.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1)
      );
    });
  }

  constructor(public readonly list: ListService, private libraryItemService: LibraryItemService) {
    this.list.maxResultCount = 20;
  }

  ngOnInit() {
    const libraryItemStreamCreator = query => this.libraryItemService.getList(query);

    this.list.hookToQuery(libraryItemStreamCreator).subscribe(response => {
      this.item = response;
    });
  }
}
