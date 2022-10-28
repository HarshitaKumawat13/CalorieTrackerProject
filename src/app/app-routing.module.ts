import { FoodActivityComponent } from './food-activity/food-activity.component';
import { DashboardComponent } from './dashboard/dashbord.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDataComponent } from './user-data/user-data.component';

const routes: Routes = [
  // Add Component here
  { path:'', component:DashboardComponent},
  {
    path : 'user-registration',
    component : UserRegistrationComponent
  },
  {
    path : 'user-list',
    component : DashboardComponent
  },
  {
    path: 'food-activity',
    component : FoodActivityComponent
  },
  // {
  //   path: 'user-data',
  //   component : UserDataComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

