// Angular imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Helpers imports
import { AuthGuard } from './helpers';

// Components imports
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';

// Layouts imports
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'resetPassword', component: ResetPasswordComponent},
      { path: 'changePassword', component: ChangePasswordComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }
      
    ]
  },
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
    
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}