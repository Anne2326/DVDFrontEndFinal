import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { ReviewComponent } from './review/review.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './layout/admin/admin.component';
import { EditdvdComponent } from './layout/admin/editdvd/editdvd.component';
import { authGurdGuard } from './guard/auth-gurd.guard';
import { HomeComponent } from './customer/home/home.component';
import { CusreviewComponent } from './customer/cusreview/cusreview.component';
import { CommentComponent } from './customer/comment/comment.component';
import { ManagefavouriteComponent } from './customer/managefavourite/managefavourite.component';
import { ReportComponent } from './layout/admin/report/report.component';

const routes: Routes = [
  { path: '', component: ReviewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'cusreview', component: CusreviewComponent },
      { path: 'comment', component: CommentComponent },
      {path:'manage-favourite',component:ManagefavouriteComponent},
    ],
  },

  {
    path: 'admin',
    component: AdminComponent,
    children:[
      { path: 'edit/:id', component: EditdvdComponent },
      {path:'report',component:ReportComponent}

    ]
  },

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
