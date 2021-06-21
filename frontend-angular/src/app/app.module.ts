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

// Modules imports
import { AppMaterialModule } from '@ui/material/material.module';
import { AppRoutingModule } from '@app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Core imports
import { AuthService } from '@core/auth';
import { AuthInterceptor } from '@core/interceptors';
import { ErrorInterceptor } from '@core/interceptors';
import { HttpCancel } from '@core/http';
import { NotificationService } from '@core/notification';
import { DataService } from '@core/data/data.service';

@NgModule({
  declarations: [
    AppComponent
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
    AuthService,
    AuthInterceptor,
    ErrorInterceptor,
    HttpCancel,
    DataService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }