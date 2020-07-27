import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BoitesService } from 'src/app/services/boites.service';

@Component({
  selector: 'app-all-bp',
  templateUrl: './all-bp.component.html',
  styleUrls: ['./all-bp.component.css'],
})
export class AllBpComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sms = true;
  mail = false;
  searchClient = '';
  searchResults = false;
  displayedColumns = ['number', 'type', 'price', 'action'];
  errorMessage = false;
  datasource;
  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  boites = [];
  boiteTypes = [];
  constructor(
    // private userS: ClientsService,
    private route: Router,
    private boiteS: BoitesService
  ) {
    //
    this.boiteS.getBoites().subscribe((data: any) => {
      this.boites = data;
      this.datasource = new MatTableDataSource(this.boites);
      this.length = this.boites.length;
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }
  initTab() {}
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
    this.searchResults = false;
    this.errorMessage = false;
  }
}
