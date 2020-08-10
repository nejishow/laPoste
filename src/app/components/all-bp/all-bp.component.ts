import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BoitesService } from 'src/app/services/boites.service';
import { AuthService } from 'src/app/services/auth.service';

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
  searchBoite = '';
  searchResults = false;
  displayedColumns = ['number', 'type', 'price', 'action'];
  errorMessage = false;
  datasource;
  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];
  boites = [];
  boiteSearch = [];
  constructor(
    // private userS: ClientsService,
    private route: Router,
    private boiteS: BoitesService,
    private authS: AuthService
  ) {
    //
    this.boiteS.getBoites().subscribe((data: any) => {
      this.boites = data;
      this.datasource = new MatTableDataSource(this.boites);
      this.length = this.boites.length;
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    },
    (error) => {
      if (error.status === 401) {
        this.authS.logout();
      }

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


  async search() {
    this.boiteSearch = [];
    this.searchResults = false;
    this.errorMessage = false;
    const bnumber = await this.searchBoite;
    if (bnumber.length === 0) {
      this.errorMessage = true;
    } else {
      await this.boites.forEach(async boite => {
        const boiteNumber = boite.number;
        if (boiteNumber.includes(bnumber)) {
          await this.boiteSearch.push(boite);
          this.searchResults = true;
        }
      });
      if (this.boiteSearch.length === 0) {
        this.errorMessage = true;
      }
    }
  }
  initForm(): void {
    this.boiteSearch = [];
    this.searchBoite = '';
    this.searchResults = false;
    this.errorMessage = false;
  }
}
