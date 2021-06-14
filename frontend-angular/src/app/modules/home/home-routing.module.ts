// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components imports 
import { HomeComponent } from './pages/home/home.component';

// Core imports
import { AuthGuard } from '@core/auth';

const routes: Routes = [
    { path: '', canActivate: [AuthGuard], component: HomeComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
