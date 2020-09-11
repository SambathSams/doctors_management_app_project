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
import { AddSpecializationComponent } from './components/master/settings/specialization-settings/add-specialization/add-specialization.component';
import { ViewSpecializationComponent } from './components/master/settings/specialization-settings/view-specialization/view-specialization.component';
import { EditSpecializationComponent } from './components/master/settings/specialization-settings/edit-specialization/edit-specialization.component';
import { AddConditionComponent } from './components/master/settings/condition-settings/add-condition/add-condition.component';
import { ViewConditionComponent } from './components/master/settings/condition-settings/view-condition/view-condition.component';
import { EditConditionComponent } from './components/master/settings/condition-settings/edit-condition/edit-condition.component';
import { TimingSettingsComponent } from './components/master/settings/timing-settings/timing-settings.component';
import { AddTimingComponent } from './components/master/settings/timing-settings/add-timing/add-timing.component';
import { ViewTimingComponent } from './components/master/settings/timing-settings/view-timing/view-timing.component';
import { EditTimingComponent } from './components/master/settings/timing-settings/edit-timing/edit-timing.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},

  { path: 'master',  canActivate: [AuthGuard],  children : [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'clinic', component: AssetManagementComponent},
    {path: 'doctor', component: DoctorComponent},
    {path: 'receptionist', component: ReceptionistComponent},
    {path: 'room', component: RoomComponent},
    {path: 'settings', children : [
      {path: '', component: LocationSettingsComponent},
      {path: 'location', component: LocationSettingsComponent},
      {path: 'specialization' , children : [
        {path: '', component: SpecializationSettingsComponent},
        {path: 'add', component: AddSpecializationComponent},
        {path: 'view/:id', component: ViewSpecializationComponent},
        {path: 'edit/:id', component: EditSpecializationComponent},
      ]},
      {path: 'condition' , children : [
        {path: '', component: ConditionSettingsComponent},
        {path: 'add', component: AddConditionComponent},
        {path: 'view/:id', component: ViewConditionComponent},
        {path: 'edit/:id', component: EditConditionComponent},
      ]},
      {path: 'timing', children : [
        {path: '', component: TimingSettingsComponent},
        {path: 'add', component: AddTimingComponent},
        {path: 'view/:id', component: ViewTimingComponent},
        {path: 'edit/:id', component: EditTimingComponent},
      ]},
    ]}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
