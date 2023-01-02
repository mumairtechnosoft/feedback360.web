import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFeedbackComponent } from './feedback/add-feedback/add-feedback.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './oidc/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LoginComponent, canActivate: [AuthGuard]
  },
  {
    path: 'register-user', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'fetch-feedbacks', component: FeedbackListComponent, canActivate: [AuthGuard]
  },
  {
    path: 'add-feedback', component: AddFeedbackComponent, canActivate: [AuthGuard]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
