// import { ClientsService } from './../../services/clients.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';

export interface User {
  name: string;
  tel: number;
  id: number;
  address: string;
  email: string;
}
const ELEMENT_DATA = [
  { id: 1, tel: 1234456, name: 'Osman', address: 'Balbala', email: 'xx@gmail.com' },
  { id: 1, tel: 2234456, name: 'Idleh', address: 'Balbala', email: 'xx@gmail.come' },
  { id: 1, tel: 3234456, name: 'Ali', address: 'Balbala', email: 'xx@gmail.comi' },
  { id: 1, tel: 4234456, name: 'Mouna', address: 'Balbala', email: 'xx@gmail.come' },
  { id: 1, tel: 5234456, name: 'Said', address: 'Balbala', email: 'xx@gmail.com' },
  { id: 1, tel: 6234456, name: 'Kafia', address: 'Balbala', email: 'xx@gmail.com' },
  { id: 1, tel: 7234456, name: 'Gregory', address: 'Balbala', email: 'xx@gmail.com' },
  { id: 1, tel: 8234456, name: 'Liban', address: 'Balbala', email: 'xx@gmail.com' },
  { id: 1, tel: 9234456, name: 'Chamis', address: 'Balbala', email: 'xx@gmail.com' },
  { id: 1, tel: 12344560, name: 'Fozia', address: 'Balbala', email: 'xx@gmail.come' },
];

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sms = true;
  mail = false;
  searchClient = '';
  searchResults = false;
  displayedColumns = ['name', 'address', 'tel', 'email', 'action'];
  errorMessage = false;
  Users = [];
  datasource = new MatTableDataSource(ELEMENT_DATA);
  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  constructor(
    // private userS: ClientsService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {//
  }
  showSms() {
    this.sms = true;
    this.mail = false;
  }
  showMail() {
    this.sms = false;
    this.mail = true;
  }
  details(idUser) {
    this.route.navigate(['/client/', idUser]);
  }
  ngOnInit() {
    this.initForm();
    this.length = ELEMENT_DATA.length;

  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }
  search() {
    // this.Users = [];
    // this.searchResults = false;
    // const letter = this.searchForm
    //   .get('letter')
    //   .value.toLowerCase()
    //   .trim();
    // if (letter === '') {
    //   this.errorMessage = true;
    // } else {
    //   this.userS.getClients().subscribe(data => {
    //     data.forEach(async user => {
    //       if (user.name.toLowerCase().includes(letter)) {
    //         await this.Users.push(user);
    //         this.searchResults = true;
    //       }
    //     });
    //     if (this.Users.length === 0) {
    //       this.errorMessage = true;
    //     }
    //   });
    // }
  }
  initForm(): void {
    this.Users = [];
    this.searchResults = false;
    this.errorMessage = false;
  }
}
