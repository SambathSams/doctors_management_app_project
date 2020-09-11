import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/master/location/location.service';

@Component({
  selector: 'app-location-settings',
  templateUrl: './location-settings.component.html',
  styleUrls: ['./location-settings.component.css']
})
export class LocationSettingsComponent implements OnInit {

  getAll;
  getId;

  constructor(private service: LocationService) {
   }

  ngOnInit(): void {
    this.getAllData();
  }

  // tslint:disable-next-line: typedef
  getIdData(id) {
    this.getId = id;
  }

  // tslint:disable-next-line: typedef
  getAllData() {
    this.service.getAll().subscribe(res => {
        this.getAll = res.data;
      });
  }

  // tslint:disable-next-line: typedef
  deleteOne(id) {
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
    });
  }

}
