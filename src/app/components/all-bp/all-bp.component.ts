import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

const ELEMENT_DATA = [
  { id: 1, number: 1234456, type: 'PETIT', price: '5000' },
  { id: 1, number: 2234456, type: 'PETIT', price: '5000' },
  { id: 1, number: 3234456, type: 'PETIT', price: '5000' },
  { id: 1, number: 4234456, type: 'MOYEN', price: '5000' },
  { id: 1, number: 5234456, type: 'MOYEN', price: '5000' },
  { id: 1, number: 6234456, type: 'MOYEN', price: '5000' },
  { id: 1, number: 7234456, type: 'GRAND', price: '5000' },
  { id: 1, number: 8234456, type: 'GRAND', price: '5000' },
  { id: 1, number: 9234456, type: 'GRAND', price: '5000' },
  { id: 1, number: 12344560, type: 'SPECIAL', price: '5000' },
];
@Component({
  selector: 'app-all-bp',
  templateUrl: './all-bp.component.html',
  styleUrls: ['./all-bp.component.css']
})
export class AllBpComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sms = true;
  mail = false;
  searchClient = '';
  searchResults = false;
  displayedColumns = ['number','type', 'price', 'action'];
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
  details(idBp) {
    this.route.navigate(['/bp/', idBp]);
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
    //       if (user.type.toLowerCase().includes(letter)) {
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
