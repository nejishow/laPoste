import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { OperationService } from 'src/app/services/operation.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-opeations',
  templateUrl: './opeations.component.html',
  styleUrls: ['./opeations.component.css']
})
export class OpeationsComponent {
  idUser;
  fatimes= faTimes
  idNewOperation;
  isPaid = false;
  deletingOperation = "";
  commentaires = "";
  client: any;
  clientBoite: any = [];
  operations: any = [];
  myoperations: Array<any> = [];
  newOperation = {
    idClient: '',
    clientName: '',
    operations: [],
    idBoite: '',
    boiteNumber: '',
    idStaff: '',
    staffName: '',
    total: 0
  };
  deletionObject = {
    idClient:"",
    clientName: "",
    global_idOperation: "",
    operations:[
      {    price: "",
      name: "",}
    ],
    comments: "",
    idBoite: "",
    boiteNumber: "",
    idStaff: "",
    staffName: "",
  };
  isdeleting= false;

  constructor(private aR: ActivatedRoute,
    private router: Router,
    private clientS: ClientsService,
    private operationS: OperationService,
  ) {
    this.aR.params.subscribe(async params => {
      this.idUser = params.id;
      await this.clientS.getClient(params.id).subscribe(async (data: any) => {
        this.client = data;
        await this.clientS.getClientBoite(params.id).subscribe(async (_data: any) => {
          this.clientBoite = _data;
          await this.clientS.getOneClientType(data.idClientType).subscribe((result: any) => {
            this.operations = result.operations;
            this.newOperation.idClient = this.idUser;
            this.newOperation.clientName = this.clientBoite.clientName;
            this.newOperation.idBoite = this.clientBoite.idBoite;
            this.newOperation.boiteNumber = this.clientBoite.boiteNumber;
            this.newOperation.idStaff = localStorage.getItem('id');
            this.newOperation.staffName = localStorage.getItem('name');
            this.deletionObject.idClient = this.idUser;
            this.deletionObject.clientName = this.clientBoite.clientName;
            this.deletionObject.idBoite = this.clientBoite.idBoite;
            this.deletionObject.boiteNumber = this.clientBoite.boiteNumber;
            this.deletionObject.idStaff = localStorage.getItem("id");
            this.deletionObject.staffName = localStorage.getItem("name");
          });

        });
        await this.operationS.getOperations(params.id).subscribe((operations: any) => {
          this.myoperations = operations.filter((op)=>{
            return op.isForfait === false
          });
        });

      });
    });
  }

  saveOperation(event) {
    if (event.target.checked) {
      this.operations.forEach(async element => {
        if (event.target.value === element._id) {
          this.newOperation.total += element.price;
          await this.newOperation.operations.push({ idOperation: event.target.value, name: element.name, price: element.price });
        }
      });
    } else {
      this.newOperation.total = 0;
      this.newOperation.operations = this.newOperation.operations.filter((element) => element.idOperation !== event.target.value);
      this.newOperation.operations.forEach(element => {
        this.newOperation.total += element.price;
      });
    }

  }

  encaisser() {
    this.operationS.postOperation(this.newOperation).subscribe((data: any) => {
      this.idNewOperation = data._id;
      this.isPaid = true
    })
  }
  deleteOperation(id) {
    this.operationS.deleteOperation(id).subscribe(()=>{
 
    })
        this.operationS.postDeletion(this.deletionObject).subscribe(()=>{
          this.isdeleting = false;
        });
    }
  delete(operation) {
    this.isdeleting = true;
    this.deletingOperation = operation._id;
    this.deletionObject.global_idOperation=  operation._id;
    this.deletionObject.operations = operation.operations
    

  }

}
