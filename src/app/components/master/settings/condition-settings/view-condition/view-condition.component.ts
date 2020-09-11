import { Component, OnInit } from '@angular/core';
import { ConditionService } from 'src/app/services/master/condition/condition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-condition',
  templateUrl: './view-condition.component.html',
  styleUrls: ['./view-condition.component.css']
})
export class ViewConditionComponent implements OnInit {

  getData;
  constructor(private service: ConditionService, private router: Router) {
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
