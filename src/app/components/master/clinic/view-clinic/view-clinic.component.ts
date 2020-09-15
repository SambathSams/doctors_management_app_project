import { Component, OnInit } from '@angular/core';
import { ClinicService } from 'src/app/services/master/clinic/clinic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-clinic',
  templateUrl: './view-clinic.component.html',
  styleUrls: ['./view-clinic.component.css']
})
export class ViewClinicComponent implements OnInit {

  getData;
  constructor(private service: ClinicService, private router: Router) {
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
