import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine.component';

@NgModule({
  declarations: [MagazineComponent],
  imports: [MagazineRoutingModule, SharedModule],
})
export class MagazineModule {}
