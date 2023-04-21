import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryItemComponent } from './item.component';

const routes: Routes = [{ path: '', component: LibraryItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
