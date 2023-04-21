import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MagazineComponent],
  imports: [MagazineRoutingModule, SharedModule, NgbDatepickerModule],
})
export class MagazineModule {}
