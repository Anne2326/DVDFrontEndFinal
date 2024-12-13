import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReviewComponent } from './review/review.component';
import { CustomerComponent } from './customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterCusPipe } from './pipes/filter-cus.pipe';
import { FilterDvdPipe } from './pipes/filter-dvd.pipe';
import { PendingFilPipe } from './pipes/pending-fil.pipe';
import { EditdvdComponent } from './layout/admin/editdvd/editdvd.component';
import { HomeComponent } from './customer/home/home.component';
import { CusreviewComponent } from './customer/cusreview/cusreview.component';
import { CommentComponent } from './customer/comment/comment.component';
import { ManagefavouriteComponent } from './customer/managefavourite/managefavourite.component';
import { ReportComponent } from './layout/admin/report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    ReviewComponent,
    CustomerComponent,
    FilterPipe,
    FilterCusPipe,
    FilterDvdPipe,
    PendingFilPipe,
    EditdvdComponent,
    HomeComponent,
    CusreviewComponent,
    CommentComponent,
    ManagefavouriteComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule, CommonModule, RouterModule, ToastrModule.forRoot(), BsDatepickerModule, HttpClientModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
