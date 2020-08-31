import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-red-clients',
  templateUrl: './red-clients.component.html',
  styleUrls: ['./red-clients.component.css']
})
export class RedClientsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sms = true;
  mail = false;
  searchClient = ''; // l'input de la recherche
  searchResults = false; // si il y'a un resultat de la recherche ou non
  displayedColumns = ['status', 'name', 'clientType', 'boiteNumber', 'action'];
  errorMessage = false;
  clientSearch = []; // le tableau des resultat de recherches
  datasource;
  allClients = []; // tous les clients
  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  constructor(
    private route: Router,
    private clientS: ClientsService,
    private authS: AuthService
  ) {
  }
  async getData() {
    await this.clientS.getRedClients().subscribe(async (clients: any) => {      
      this.allClients = clients;
      this.datasource = await new MatTableDataSource(this.allClients);
      this.length = this.datasource.length;
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });

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

  async ngOnInit() {
    this.initForm();
    this.getData();

    //
  }

  // tslint:disable-next-line:use-lifecycle-interfac

  async search() {
    this.clientSearch = [];
    this.searchResults = false;
    this.errorMessage = false;
    const name = await this.searchClient.toLowerCase().trim();
    if (name.length === 0) {
      this.errorMessage = true;

    } else {
      await this.allClients.forEach(async client => {
        if (client.clientName === undefined) {
        } else {
          const clientName = await client.clientName.trim().toLowerCase();
          if (clientName.includes(name)) {
            await this.clientSearch.push(client);
            this.searchResults = true;
          }
        }
      });
      if (this.clientSearch.length === 0) {
        this.errorMessage = true;
      }
    }
  }
  initForm(): void {
    this.clientSearch = [];
    this.searchClient = '';
    this.searchResults = false;
    this.errorMessage = false;
  }
}
