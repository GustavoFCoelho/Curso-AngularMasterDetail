import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import { NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    NavbarComponent
  ]
})
export class CoreModule {
}
