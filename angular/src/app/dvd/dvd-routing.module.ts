import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DvdComponent } from './dvd.component';

const routes: Routes = [{ path: '', component: DvdComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DvdRoutingModule { }
