import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularIsAwesomeComponent } from './blogs/angular-is-awesome/angular-is-awesome.component';

@NgModule({
  declarations: [
    AppComponent,
    AngularIsAwesomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
