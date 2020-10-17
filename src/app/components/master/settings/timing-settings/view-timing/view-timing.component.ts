import { Component, OnInit } from '@angular/core';
import { TimingService } from 'src/app/services/master/timing/timing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-timing',
  templateUrl: './view-timing.component.html',
  styleUrls: ['./view-timing.component.css']
})
export class ViewTimingComponent implements OnInit {

  getData;
  constructor(private service: TimingService, private router: Router) {
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
