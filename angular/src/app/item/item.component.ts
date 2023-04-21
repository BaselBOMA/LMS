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


  constructor(
    public readonly list: ListService,
    private libraryItemService: LibraryItemService,
  ) {}

  ngOnInit() {
    const libraryItemStreamCreator = query => this.libraryItemService.getList(query);

    this.list.hookToQuery(libraryItemStreamCreator).subscribe(response => {
      this.item = response;
    });
  }
}
