import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/master/location/location.service';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-location-settings',
  templateUrl: './location-settings.component.html',
  styleUrls: ['./location-settings.component.css']
})
export class LocationSettingsComponent implements OnInit {

  getAll;
  getId;
  lengthh;
  index;
  constructor(
    private service: LocationService,
    private appComponent: AppComponent
    ) {
   }

  ngOnInit(): void {
    this.appComponent.setTitle("Location Management | Doctor Plaza");
    this.getAllData();
  }

  // tslint:disable-next-line: typedef
  getIdData(id,i) {
    this.getId = id;
    this.index = i;
  }


  // tslint:disable-next-line: typedef
  getAllData() {
    this.service.getAll().subscribe(res => {
        this.getAll = res.data;
        this.lengthh = this.getAll.length;
      });
  }

  // tslint:disable-next-line: typedef
  deleteOne(id) {
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
    });
    this.getAll.splice(this.index,1);
  }

}
