
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDataComponent } from './user-data/user-data.component';
import { DashboardComponent } from './dashboard/dashbord.component';
import { FoodActivityComponent } from './food-activity/food-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    UserDataComponent,
    DashboardComponent,
    FoodActivityComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
