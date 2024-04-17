import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailablefilmsComponent } from './availablefilms/availablefilms.component';

const routes: Routes = [
  {path:'',component:AvailablefilmsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRatingRoutingModule { }
