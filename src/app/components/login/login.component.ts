import { StaffsService } from './../../services/staffs.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error;
  email: '';
  password: '';
  constructor(
    private staffS: StaffsService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }
  submit(): void {
    //
    this.staffS.login(this.email, this.password);
    this.staffS.erroLogout().subscribe((data) => {
      this.error = data;
    });
  }

}
