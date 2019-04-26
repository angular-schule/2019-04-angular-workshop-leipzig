import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookComponent } from './book/book.component';
import { ButtonSharedModule } from '../button-shared/button-shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BookComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ButtonSharedModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class BooksModule { }
