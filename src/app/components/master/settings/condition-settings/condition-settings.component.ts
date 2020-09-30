import { Component, OnInit } from '@angular/core';
import { ConditionService } from 'src/app/services/master/condition/condition.service';
import { AppComponent } from '../../../../app.component';

@Component({
  selector: 'app-condition-settings',
  templateUrl: './condition-settings.component.html',
  styleUrls: ['./condition-settings.component.css']
})
export class ConditionSettingsComponent implements OnInit {
  getAll;
  getId;
  lengthh;
  constructor(private service: ConditionService,private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.appComponent.setTitle("Condition Management | Doctor Plaza");
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
        this.lengthh = this.getAll.length;
      });
  }

  // tslint:disable-next-line: typedef
  deleteOne(id) {
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
    });
  }
}
