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
  isReceipt = false;
  client: any;
  clientBoite: any = [];
  operations: any = [];
  myoperations: any = [];
  newOperation;

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
          });

        });
        await this.operationS.getOperations(params.id).subscribe((operations: any) => {
          this.myoperations = operations;
        });

      });
    });
  }

  saveOperation(event) {

    if (event.value) {
      this.operations.forEach(async element => {
        if (event.value === element._id) {
          this.newOperation = { idOperation: event.value, name: element.name, price: element.price };
          this.operationS.operation = this.newOperation;

        }
      });
    }

  }

}
