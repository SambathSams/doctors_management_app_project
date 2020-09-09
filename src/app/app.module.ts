import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RentManagementComponent } from './components/master/rent-management/rent-management.component';
import { AssetManagementComponent } from './components/master/asset-management/asset-management.component';
import { DashboardComponent } from './components/master/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DoctorComponent } from './components/master/doctor/doctor.component';
import { ReceptionistComponent } from './components/master/receptionist/receptionist.component';
import { RoomComponent } from './components/master/room/room.component';

import { AuthGuard } from './services/auth/auth.guard';
import { LocationSettingsComponent } from './components/master/settings/location-settings/location-settings.component';
import { SpecializationSettingsComponent } from './components/master/settings/specialization-settings/specialization-settings.component';
import { ConditionSettingsComponent } from './components/master/settings/condition-settings/condition-settings.component';
import { SidebarSettingsComponent } from './components/master/settings/sidebar-settings/sidebar-settings.component';
import { TimeSettingsComponent } from './components/master/settings/time-settings/time-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RentManagementComponent,
    AssetManagementComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DoctorComponent,
    ReceptionistComponent,
    RoomComponent,
    LocationSettingsComponent,
    SpecializationSettingsComponent,
    ConditionSettingsComponent,
    SidebarSettingsComponent,
    TimeSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
