import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BlankComponent } from './layout/blank/blank.component';
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


@NgModule({
  declarations: [
    AppComponent,

    AdminComponent,
    BlankComponent,
    LoginComponent,
    RegisterComponent,
    ReviewComponent,
    CustomerComponent,
    FilterPipe,
    FilterCusPipe,
    FilterDvdPipe,
    PendingFilPipe,
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
