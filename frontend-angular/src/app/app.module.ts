// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

// Librairies imports
import { CookieService } from 'ngx-cookie-service';

// Components imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastComponent } from './components/toast/toast.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

// Modules imports
import { AppMaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Services imports
import { AuthenticationService } from './services';
import { DataService } from './services';
import { NotificationService } from './services';


// Helpers imports
import { ErrorInterceptor } from './helpers';
import { HttpCancel } from './helpers';
import { JwtInterceptor } from './helpers';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    HomeComponent,
    HomeLayoutComponent,
    RegisterComponent,
    ToastComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppMaterialModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthenticationService,
    DataService,
    NotificationService,
    HttpCancel,
    DatePipe,
    CookieService,
    ToastComponent,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

