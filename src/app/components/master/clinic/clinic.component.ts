import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/services/master/clinic/clinic.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  getAll;
  getId;

  constructor(private service: ClinicService) {
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
