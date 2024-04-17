import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRatingRoutingModule } from './movie-rating-routing.module';
import { AvailablefilmsComponent } from './availablefilms/availablefilms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AvailablefilmsComponent
  ],
  imports: [
    CommonModule,
    MovieRatingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MovieRatingModule { }
