import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/master/dashboard/dashboard.component';
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
import { AddLocationComponent } from './components/master/settings/location-settings/add-location/add-location.component';
import { EditLocationComponent } from './components/master/settings/location-settings/edit-location/edit-location.component';
import { ViewLocationComponent } from './components/master/settings/location-settings/view-location/view-location.component';
import { ClinicComponent } from './components/master/clinic/clinic.component';
import { AddClinicComponent } from './components/master/clinic/add-clinic/add-clinic.component';
import { ViewClinicComponent } from './components/master/clinic/view-clinic/view-clinic.component';
import { EditClinicComponent } from './components/master/clinic/edit-clinic/edit-clinic.component';
import { ViewRoomComponent } from './components/master/room/view-room/view-room.component';
import { EditRoomComponent } from './components/master/room/edit-room/edit-room.component';

const routes: Routes = [
  {path : 'login', component : LoginComponent},

  { path: 'master',  canActivate: [AuthGuard],  children : [
    {path: '', component: DashboardComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'clinic', children : [
      {path: '', component: ClinicComponent},
      {path: 'add', component: AddClinicComponent},
      {path: 'view/:id', component: ViewClinicComponent},
      {path: 'edit/:id', component: EditClinicComponent}
    ]},
    {path: 'doctor', component: DoctorComponent},
    {path: 'receptionist', component: ReceptionistComponent},
    {path: 'room', children : [
      {path: '', component: RoomComponent},
      {path: 'view/:id', component: ViewRoomComponent},
      {path: 'edit/:id', component: EditRoomComponent}
    ]},
    {path: 'settings', children : [
      {path: '', component: LocationSettingsComponent},
      {path: 'location', children : [
        {path: '', component: LocationSettingsComponent},
        {path: 'add', component: AddLocationComponent},
        {path: 'view/:id', component: ViewLocationComponent},
        {path: 'edit/:id', component: EditLocationComponent},
      ]},
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
  { path: '', redirectTo: 'master', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
