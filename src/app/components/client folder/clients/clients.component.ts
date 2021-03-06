import { AuthService } from './../../../services/auth.service';
import { StaffsService } from './../../../services/staffs.service';
import { faTimes, faExclamation, faCircle, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
// import { ClientsService } from './../../services/clients.service';
import {
  Component,
  OnInit,
  ViewChild,

} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientsService } from 'src/app/services/clients.service';
import { BoitesService } from 'src/app/services/boites.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sms = true;
  mail = false;
  searchClient = ''; // l'input de la recherche
  searchBoite = ''; // l'input de la recherche
  searchResults = false; // si il y'a un resultat de la recherche ou non
  displayedColumns = ['status', 'name', 'clientType', 'boiteNumber', 'action'];
  errorMessage = false;
  clientSearch = []; // le tableau des resultat de recherches
  datasource;
  allClients = []; // tous les clients
  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 25];
  isSuperviseur = false;
  hasPower = false;
  isAgent = false;
  isVisiteur = false;
  constructor(
    private route: Router,
    private clientS: ClientsService,
    private authS: AuthService
  ) {
    this.isSuperviseur = this.authS.isSuperviseur;
    this.hasPower = this.authS.hasPower;
    this.isVisiteur = this.authS.isVisiteur;
    this.isAgent = this.authS.isAgent;
  }
  async getData() {
    await this.clientS.getClients().subscribe(async (clients: any) => {
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
  async searchB() {
    this.clientSearch = [];
    this.searchResults = false;
    this.errorMessage = false;
    const boite = await this.searchBoite.toLowerCase().trim();
    if (boite.length === 0) {
      this.errorMessage = true;

    } else {
      await this.allClients.forEach(async client => {
        if (client.boiteNumber === undefined) {
        } else {
          const boiteNumber = await client.boiteNumber.trim().toLowerCase();
          if (boiteNumber === boite) {
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
    this.searchBoite = '';
    this.searchResults = false;
    this.errorMessage = false;
  }
}
