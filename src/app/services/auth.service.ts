import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', localStorage.getItem('token'));
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public error: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public staff: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private router: Router) { }
  Authenticated() {
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
      this.isAuth.next(true);
    } else {
      this.isAuth.next(false);
    }
    return this.isAuth.asObservable();

  }

  canActivate(): boolean {
    let state = false;

    this.Authenticated().subscribe(data => {
      state = data;
    });
    if (state) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  getStaff() {
    const staff = { name: localStorage.getItem('name'), idST: localStorage.getItem('idST'), id: localStorage.getItem('id') };
    this.staff.next(staff);
    return this.staff.asObservable();
  }
  login(email, password) {
    const body = { email, password };
    return this.http.post(this.url + '/staff/login', body).subscribe(async (data: any) => {
      await localStorage.setItem('id', data.staff._id);
      await localStorage.setItem('idST', data.staff.idStaffType);
      await localStorage.setItem('name', data.staff.name);
      await localStorage.setItem('token', data.token);
      this.error.next('');
      this.staff.next(data.staff);
      await this.Authenticated();
      await this.router.navigate(['/dashboard']);

    }, (error) => {
      this.error.next(error.error);
    });
  }
  erroLogout(): Observable<any> {
    return this.error.asObservable();

  }
  logout() {
    return this.http.get(this.url + '/staff/logout', { headers: this.headers }).subscribe(() => {
      localStorage.clear();
      this.Authenticated();
      this.router.navigate(['/login']);
    }, (error) => {
      if (error.status === 401) {
        localStorage.clear();
        this.Authenticated();
        this.router.navigate(['/login']);
      }
    });
  }
}
