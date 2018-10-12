import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    return this.checkUser(url);
  }

  async checkUser(url: string) {
    if (this.auth.afAuth.auth.currentUser) {
      return true;
    }

    this.auth.redirectUrl = url;

    this.router.navigate(['/bogz/login']);

    return false;
  }
}
