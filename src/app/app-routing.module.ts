import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/master/dashboard/dashboard.component';
import { AssetManagementComponent } from './components/master/asset-management/asset-management.component';
import { DoctorComponent } from './components/master/doctor/doctor.component';
import { ReceptionistComponent } from './components/master/receptionist/receptionist.component';
import { RoomComponent } from './components/master/room/room.component';

import { AuthGuard } from './services/auth/auth.guard';
import { LocationSettingsComponent } from './components/master/settings/location-settings/location-settings.component';
import { SpecializationSettingsComponent } from './components/master/settings/specialization-settings/specialization-settings.component';
import { ConditionSettingsComponent } from './components/master/settings/condition-settings/condition-settings.component';
import { TimeSettingsComponent } from './components/master/settings/time-settings/time-settings.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},

  { path: 'master',  canActivate: [AuthGuard],  children : [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'clinic', component: AssetManagementComponent},
    {path: 'doctor', component: DoctorComponent},
    {path: 'receptionist', component: ReceptionistComponent},
    {path: 'room', component: RoomComponent},
    {path: 'settings', children : [
      {path: 'location', component: LocationSettingsComponent},
      {path: 'specialization', component: SpecializationSettingsComponent},
      {path: 'condition', component: ConditionSettingsComponent},
      {path: 'timing', component: TimeSettingsComponent},
    ]}
  ] },
  // { path : '', redirectTo: 'master', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
