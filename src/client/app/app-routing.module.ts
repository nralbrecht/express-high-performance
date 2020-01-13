import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesmenListComponent } from './salesmen-list/salesmen-list.component';
import { SalesmenDetailComponent } from './salesmen-detail/salesmen-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '', component: SalesmenListComponent, canActivate: [AuthGuard] },
  { path: 'salesman/:sid', component: SalesmenDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
