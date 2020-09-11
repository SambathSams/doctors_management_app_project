import { Component, OnInit } from '@angular/core';
import { SpecializationService } from 'src/app/services/master/specialization/specialization.service';

@Component({
  selector: 'app-specialization-settings',
  templateUrl: './specialization-settings.component.html',
  styleUrls: ['./specialization-settings.component.css']
})
export class SpecializationSettingsComponent implements OnInit {
  getAll;
  getId;

  constructor(private service: SpecializationService) {
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
