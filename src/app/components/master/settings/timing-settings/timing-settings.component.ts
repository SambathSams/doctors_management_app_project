import { Component, OnInit } from '@angular/core';
import { TimingService } from 'src/app/services/master/timing/timing.service';

@Component({
  selector: 'app-timing-settings',
  templateUrl: './timing-settings.component.html',
  styleUrls: ['./timing-settings.component.css']
})
export class TimingSettingsComponent implements OnInit {

  getAll;
  getId;

  constructor(private service: TimingService) {
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
