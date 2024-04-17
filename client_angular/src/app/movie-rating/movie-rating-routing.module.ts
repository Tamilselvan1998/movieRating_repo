import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailablefilmsComponent } from './availablefilms/availablefilms.component';
import { AddfilmsComponent } from './addfilms/addfilms.component';
import { AddratingComponent } from './addrating/addrating.component';

const routes: Routes = [
  {path:'',component:AvailablefilmsComponent},
  {path:'addMovie', component:AddfilmsComponent},
{path:'rate',component:AddratingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRatingRoutingModule { }
