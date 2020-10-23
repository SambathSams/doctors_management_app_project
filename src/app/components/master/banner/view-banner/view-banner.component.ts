import { Component, OnInit } from '@angular/core';
// import { DoctorService } from 'src/app/services/master/doctor/doctor.service';
import { Router } from '@angular/router';
import { BannerService } from '../../../../services/master/banner/banner.service';

@Component({
  selector: 'app-view-banner',
  templateUrl: './view-banner.component.html',
  styleUrls: ['./view-banner.component.css']
})
export class ViewBannerComponent implements OnInit {

  getData;
  constructor(private service: BannerService, private router: Router) {
  }

  ngOnInit(): void {
    this.getByIdData(this.router.url.split('/').pop());
  }

  // tslint:disable-next-line: typedef
  getByIdData(id) {
    this.service.getById(id).subscribe(res => {
        console.log(res.data);
        this.getData = res.data;
      });
  }

}
