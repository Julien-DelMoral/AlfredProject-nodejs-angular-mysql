import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components imports
import { LoginComponent } from '@account/pages/login/login.component';
import { RegisterComponent } from '@account/pages/register/register.component';
import { ResetPasswordComponent } from '@account/pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from '@account/pages/change-password/change-password.component';
import { LogoutComponent } from '@account/components/logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'resetPassword', component: ResetPasswordComponent},
  { path: 'changePassword', component: ChangePasswordComponent},
  { path: 'logout', component: LogoutComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
