import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiseaseDetectionComponent } from './components/disease-detection/disease-detection.component';
import { LocationComponent } from './components/location/location.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { HomeComponent } from './components/home/home.component';
import { AddCowComponent } from './components/add-cow/add-cow.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path : "detect",
    component : DiseaseDetectionComponent
  },
  {
    path : "location",
    component : LocationComponent
  },
  {
    path : "vaccination",
    component : VaccinationComponent
  },
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "addcow",
    component :AddCowComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
