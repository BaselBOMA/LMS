import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DvdRoutingModule } from './dvd-routing.module';
import { DvdComponent } from './dvd.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DvdComponent],
  imports: [DvdRoutingModule, SharedModule, NgbDatepickerModule],
})
export class DvdModule {}
