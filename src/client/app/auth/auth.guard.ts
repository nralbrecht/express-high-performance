import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      // not logged in so redirect to login page with the return url
      if (!state.url || state.url === "/") {
        this.router.navigate(['/login']);
      }
      else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      }

      return false;
    }

    const currentUser = this.authenticationService.getCurrentUser();

    if (currentUser.roles.includes("sales") && currentUser.idCRX) {
      if (route.url.length == 2 && route.url[0].path === "salesman" && route.url[1].path === currentUser.idCRX.toString()) {
        return true;
      }
      else {
        this.router.navigate(['/salesman/' + currentUser.idCRX]);
        return false;
      }
    }

    return true;
  }
}
