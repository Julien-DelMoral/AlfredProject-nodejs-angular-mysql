// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules imports
import { AccountRoutingModule } from './account-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '@ui/material/material.module';

// Components imports
import { LoginComponent } from '@account/pages/login/login.component';
import { RegisterComponent } from '@account/pages/register/register.component';
import { ResetPasswordComponent } from '@account/pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from '@account/pages/change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [
  ]
})
export class AccountModule { }
