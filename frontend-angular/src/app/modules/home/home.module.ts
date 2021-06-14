// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules imports
import { HomeRoutingModule } from './home-routing.module';

// Components imports
import { HomeComponent } from '@home/pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [
    
  ]
})
export class HomeModule { }
