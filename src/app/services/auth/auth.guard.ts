import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }

  verifyLogin(url): boolean {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    else if (this.isLoggedIn()) {
      return true;
    }
  }
  public isLoggedIn(): boolean {
    let status = false;
    // tslint:disable-next-line: triple-equals
    if (localStorage.getItem('isLoggedIn') == 'true') {
      status = true;
    }
    return status;
  }

}
