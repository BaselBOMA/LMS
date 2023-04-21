import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ItemRoutingModule } from './item-routing.module';
import { LibraryItemComponent } from './item.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LibraryItemComponent],
  imports: [ItemRoutingModule, SharedModule, NgbDatepickerModule],
})
export class ItemModule {}
