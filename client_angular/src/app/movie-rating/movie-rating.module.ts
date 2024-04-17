import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRatingRoutingModule } from './movie-rating-routing.module';
import { AvailablefilmsComponent } from './availablefilms/availablefilms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddfilmsComponent } from './addfilms/addfilms.component';
import { AddratingComponent } from './addrating/addrating.component';


@NgModule({
  declarations: [
    AvailablefilmsComponent,
    AddfilmsComponent,
    AddratingComponent
  ],
  imports: [
    CommonModule,
    MovieRatingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class MovieRatingModule { }
