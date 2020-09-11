import { Component, OnInit } from '@angular/core';
import { SpecializationService } from 'src/app/services/master/specialization/specialization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-specialization',
  templateUrl: './view-specialization.component.html',
  styleUrls: ['./view-specialization.component.css']
})
export class ViewSpecializationComponent implements OnInit {
  getData;
  constructor(private service: SpecializationService, private router: Router) {
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
