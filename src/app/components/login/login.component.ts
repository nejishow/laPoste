import { AuthService } from './../../services/auth.service';
import { StaffsService } from './../../services/staffs.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, OnInit, AfterViewInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error;
  email: '';
  password: '';
  isLoading = false;
  constructor(
    private authS: AuthService,
    private router: Router
  ) {
  }

  submit(): void {
    //
    this.isLoading = true
    this.authS.login(this.email, this.password);
    this.authS.erroLogout().subscribe((data) => {
      if (data !== '') {
        this.error = data;
        this.isLoading = false
      }
    });
  }

}
