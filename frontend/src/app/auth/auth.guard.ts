import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //console.log(this.router.routerState)
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('');
      this.userService.deleteToken();
      return false;
    }
    /*if (this.userService.isLoggedIn() && this.router.url == '/') {

      //window.location.href = environment.hostBaseUrl + 'userprofile'
      console.log("WTFFFFFFFFFFF")
    }*/
    return true;
  }
}
