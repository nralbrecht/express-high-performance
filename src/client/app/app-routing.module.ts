import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesmenListComponent } from './salesmen-list/salesmen-list.component';
import { SalesmenDetailComponent } from './salesmen-detail/salesmen-detail.component';

const routes: Routes = [
  { path: '', component: SalesmenListComponent },
  { path: 'salesman/:sid', component: SalesmenDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
