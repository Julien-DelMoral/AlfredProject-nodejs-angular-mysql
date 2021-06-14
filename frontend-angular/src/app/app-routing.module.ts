// Angular imports
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Modules imports
import { AccountModule } from '@modules/account/account.module'
import { HomeModule } from '@modules/home/home.module';

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => AccountModule
  },
  {
    path: 'home',
    loadChildren: () => HomeModule
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
    
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}