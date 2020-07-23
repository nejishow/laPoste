// import { ClientsService } from './../../services/clients.service';
import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { FormBuilder } from "@angular/forms";
import { ClientsService } from "src/app/services/clients.service";
import { SharedService } from "src/app/shared/shared.service";
import { Subscription } from "rxjs";
import { BoitesService } from 'src/app/services/boites.service';

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.css"],
})
export class ClientsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  sms = true;
  mail = false;
  searchClient = "";
  searchResults = false;
  displayedColumns = ["name", "clientType", "boite", "action"];
  errorMessage = false;
  Users = [];
  datasource;
  clients= []; // le tableau final
  allClients; // tous les clients
  allClientTypes; // tous les types de clients
  allBoites; // toutes les boites
  subscription: Subscription; // doit etre supprimé sert a rien
  length;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15];
  constructor(
    private route: Router,
    private clientS: ClientsService,
    private boiteS: BoitesService
  ) { 
    this.getData();

   }
  async getData() {
    await this.clientS.getClients().subscribe(async (clients) => {
      this.allClients = clients
      await this.clientS.getClientType().subscribe(async (data) => {
        this.allClientTypes = data
        await this.boiteS.getBoites().subscribe(async (data) => {
          this.allBoites = data          
          this.clients = await this.createClientTable(this.allClients, this.allClientTypes, this.allBoites);
          this.datasource = new MatTableDataSource(this.clients);
          this.length = this.datasource.length;
          this.datasource.sort = this.sort;
          this.datasource.paginator = this.paginator;
        });
      });
    });
    this.initTable()
    
  }
  ngOnChanges() {
    //
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
    this.route.navigate(["/client/", idUser]);
  }
  createClientTable(client, clientT, boite) {
    let clients: Array <{id:string,name:string, clientType:string, boite:string}> =[] ;
    client.forEach((c) => {
      let data= {id:"",name:"",clientType:'',boite:""};
      clientT.forEach((clientType) => {
        if (c.idClientType == clientType._id) {
          (data.name = c.name),
          (data.id = c._id),
            (data.clientType = clientType.name);
        }
      });
      boite.forEach((b) => {
        if (c.idBoite == b._id) {
          (data.boite = b.number)
        }
      });
      clients.push(data)
    });
    return clients;
  }
  async ngOnInit() {
    this.initForm();
    //
  }
  initTable(){
  }
  // tslint:disable-next-line:use-lifecycle-interfac

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
