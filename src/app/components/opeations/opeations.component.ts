import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-opeations',
  templateUrl: './opeations.component.html',
  styleUrls: ['./opeations.component.css']
})
export class OpeationsComponent {
  idUser;
  idNewOperation;
  isPaid = false;
  isReceipt = false;
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
          });

        });
        await this.operationS.getOperations(params.id).subscribe((operations: any) => {
          this.myoperations = operations;
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
  show(op) {
    console.log(op);

  }

}
