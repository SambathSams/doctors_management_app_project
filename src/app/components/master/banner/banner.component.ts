import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../services/master/banner/banner.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  getAll;
  getId;
  index;
  lengthh;

  constructor(
    private service: BannerService,
    private appComponent: AppComponent
    ) {
   }

  ngOnInit(): void {
    this.appComponent.setTitle("Banner Management | Doctor Plaza");
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
        console.log(this.getAll)
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
