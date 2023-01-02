import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFeedbackComponent } from './feedback/add-feedback/add-feedback.component';
import { FeedbackListComponent } from './feedback/feedback-list/feedback-list.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DataService } from './shared/data-service.service';
import { RegisterComponent } from './register/register.component';
import { NgAuthModule } from './oidc/ng-auth.module';
import { AuthGuard } from './oidc/guards/auth.guard';
import { AuthInterceptor } from './oidc/interceptors/auth.interceptor';
import { AuthenticationService } from './oidc/services/authentication.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    FeedbackListComponent,
    AddFeedbackComponent,
    HomeComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut:5000,
      closeButton: true,
      preventDuplicates: true,
      autoDismiss: true,
      maxOpened: 1,
      newestOnTop: true,
    }),
    BrowserAnimationsModule,
    NgAuthModule
  ],
  providers: [DataService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
