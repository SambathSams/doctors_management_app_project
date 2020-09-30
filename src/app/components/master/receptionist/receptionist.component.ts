import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

import { ReceptionistService } from '../../../services/master/receptionist/receptionist.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {

  getAll;
  getId;
  index;
  lengthh;

  constructor(
    private service: ReceptionistService,
    private appComponent: AppComponent
    ) {
   }

  ngOnInit(): void {
    this.appComponent.setTitle("Clinic manager | Doctor Plaza");
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
