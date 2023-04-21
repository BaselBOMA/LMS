import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DvdRoutingModule } from './dvd-routing.module';
import { DvdComponent } from './dvd.component';

@NgModule({
  declarations: [DvdComponent],
  imports: [DvdRoutingModule, SharedModule],
})
export class DvdModule {}
