import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DvdComponent } from './dvd.component';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';

const routes: Routes = [{ path: '', component: DvdComponent, canActivate: [AuthGuard, PermissionGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DvdRoutingModule { }
