import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';



@NgModule({
  declarations: [
    AboutPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AboutPageComponent,
    HomePageComponent
  ]
})
export class SharedModule { }
