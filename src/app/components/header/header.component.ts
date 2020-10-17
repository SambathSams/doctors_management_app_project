import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUrl: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  // tslint:disable-next-line: typedef
  logout(){
    this.authService.logout();
  }

}
