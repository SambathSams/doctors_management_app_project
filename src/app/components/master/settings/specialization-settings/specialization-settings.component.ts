import { Component, OnInit } from '@angular/core';
import { SpecializationService } from 'src/app/services/master/specialization/specialization.service';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-specialization-settings',
  templateUrl: './specialization-settings.component.html',
  styleUrls: ['./specialization-settings.component.css']
})
export class SpecializationSettingsComponent implements OnInit {
  getAll;
  getId;
  lengthh;
  index;
  constructor(
    private service: SpecializationService,
    private appComponent: AppComponent
    ) {
   }

  ngOnInit(): void {
    this.appComponent.setTitle("Specialization Management | Doctor Plaza");
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
