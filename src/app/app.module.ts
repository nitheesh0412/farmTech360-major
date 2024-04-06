import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiseaseDetectionComponent } from './components/disease-detection/disease-detection.component';
import { LocationComponent } from './components/location/location.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgIf, NgFor} from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';

import { MatTableDataSource } from '@angular/material/table';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { Sort, MatSortModule} from '@angular/material/sort';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewuserComponent } from './components/viewuser/viewuser.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { AddCowComponent } from './components/add-cow/add-cow.component';
import { NutritionComponent } from './components/nutrition/nutrition.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { CowlistComponent } from './components/cowlist/cowlist.component';

@NgModule({
  declarations: [
    AppComponent,
    DiseaseDetectionComponent,
    LocationComponent,
    VaccinationComponent,
    ViewuserComponent,
    EdituserComponent,
    HomeComponent,
    AddCowComponent,
    NutritionComponent,
    NotificationsComponent,
    CowlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatSlideToggleModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatBadgeModule,
    NgIf, MatCheckboxModule, FormsModule, NgFor,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
    NotifierModule
  ],
  providers: [ {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
