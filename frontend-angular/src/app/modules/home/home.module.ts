// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules imports
import { HomeRoutingModule } from './home-routing.module';
import { AppMaterialModule } from '@ui/material/material.module';

// Components imports
import { HomeComponent } from '@home/pages/home/home.component';
import { ToolbarComponent } from '@ui/toolbar/toolbar.component';
import { SidenavComponent } from '@ui/sidenav/sidenav.component';

@NgModule({
  declarations: [
    HomeComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppMaterialModule
  ],
  providers: [
    
  ]
})
export class HomeModule { }
