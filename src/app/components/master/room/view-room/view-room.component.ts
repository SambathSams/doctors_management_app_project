import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/master/room/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent implements OnInit {

  getData;
  constructor(private service: RoomService, private router: Router) {
  }

  getDoctorData;

  ngOnInit(): void {
    this.getByIdData(this.router.url.split('/').pop());
  }

  // tslint:disable-next-line: typedef
  getByIdData(id) {
    this.service.getById(id).subscribe(res => {
        console.log(res.data);
        if (res.data.doctorData){
          this.getDoctorData = res.data.doctorData.doctorName;
        }
        else{
          this.getDoctorData = '-';
        }
        this.getData = res.data;
      });
  }

}
