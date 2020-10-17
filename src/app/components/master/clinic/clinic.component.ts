import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../../../services/master/clinic/clinic.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent implements OnInit {

  getAll;
  getId;
  index;
  lengthh;
  selected: any;

  constructor(
    private service: ClinicService,
    private appComponent: AppComponent
    ) {
   }

  ngOnInit(): void {
    this.appComponent.setTitle("Clinic Management | Doctor Plaza");
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
        console.log('lengthhhhhh',this.getAll.length)
      });
  }

  get_by_status(data) {
    const temp: any = {
      status: data
    }
    this.service.getByStatus(temp).subscribe(res => {
        this.getAll = res.data;
        this.lengthh = this.getAll.length;
        console.log('lengthhhhhh',this.getAll.length)
      });
  }

  changeCity() {
    console.log(this.selected)
    this.get_by_status(this.selected)
  }

  clearData() {
    this.getAllData();
  }


  // tslint:disable-next-line: typedef
  deleteOne(id) {
    this.service.deleteById(id).subscribe(res => {
      this.getId = undefined;
    });
    this.getAll.splice(this.index,1);
  }

}
