import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/master/patient/patient.service';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  getAll;
  getId;
  index;

  constructor(
    private service: PatientService,
    private appComponent: AppComponent
    ) {
   }

  ngOnInit(): void {
    this.appComponent.setTitle("Patient Management | Doctor Plaza");
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
      });
  }

  // tslint:disable-next-line: typedef
  deleteOne(id) {
    
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
    });
    this.getAll.splice(this.index,1)
  }

}
