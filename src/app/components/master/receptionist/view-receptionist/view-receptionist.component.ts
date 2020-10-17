import { Component, OnInit } from '@angular/core';
import { ReceptionistService } from 'src/app/services/master/receptionist/receptionist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-receptionist',
  templateUrl: './view-receptionist.component.html',
  styleUrls: ['./view-receptionist.component.css']
})
export class ViewReceptionistComponent implements OnInit {

  getData;
  constructor(private service: ReceptionistService, private router: Router) {
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
