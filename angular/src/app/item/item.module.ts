import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ItemRoutingModule } from './item-routing.module';
import { LibraryItemComponent } from './item.component';

@NgModule({
  declarations: [LibraryItemComponent],
  imports: [ItemRoutingModule, SharedModule],
})
export class ItemModule {}
