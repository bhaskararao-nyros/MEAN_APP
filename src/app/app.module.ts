import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from "@angular/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import filter
import {TimeAgoPipe} from 'time-ago-pipe';
import { CarsService } from './cars.service';

// Auto-complete
import { Ng2CompleterModule } from "ng2-completer";
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

const appRoutes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    TimeAgoPipe,
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxCarouselModule
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
