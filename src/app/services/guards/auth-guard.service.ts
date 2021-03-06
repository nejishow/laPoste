import { AuthService } from './../auth.service';
import { LoginComponent } from './../../components/login/login.component';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { StaffsService } from './../staffs.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authS: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request).subscribe(() => { }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        // 401 handled in auth.interceptor
        this.authS.logout();

      }
     });
  }

  canActivate(): boolean {
    let state = false;
    this.authS.Authenticated().subscribe(data => {
      state = data;
    });
    if (!state) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
