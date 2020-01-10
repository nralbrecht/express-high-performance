import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { SalesmenListComponent } from './salesmen-list/salesmen-list.component';
import { SalesmenDetailComponent } from './salesmen-detail/salesmen-detail.component';
import { OrderEvaluationComponent } from './order-evaluation/order-evaluation.component';
import { PerformanceEvaluationComponent } from './performance-evaluation/performance-evaluation.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [AppComponent, SalesmenListComponent, SalesmenDetailComponent, OrderEvaluationComponent, PerformanceEvaluationComponent, BasicDialogComponent],
  entryComponents: [BasicDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
