import { PaymentsService } from 'src/app/services/payments.service';
import { OperationService } from 'src/app/services/operation.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  date = new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear();
  id;
  newOperation;
  clientBoite;
  isOperation = false;
  isPayment = false;
  newPayment;
  constructor(private router: Router, private ar: ActivatedRoute,
    private clientS: ClientsService, private opS: OperationService,
    private payS: PaymentsService) {
    this.ar.params.subscribe(async (result) => {
      this.id = result.id;
      if (result.isOperation) {
        this.isOperation = true;
        // await this.clientS.getClientBoite(result.id).subscribe((cb) => {
        //   this.clientBoite = cb;
        // });
        await this.opS.getOperation(result.id).subscribe(async (data: any) => {
          this.newOperation = data;
          await this.clientS.getClientBoite(data.idClient).subscribe((cb) => {
            this.clientBoite = cb;
          });
        });
       // this.newOperation = history.state.operation;

      } else {
        this.isPayment = true;
        await this.payS.getPayment(result.id).subscribe(async (data: any) => {
          this.newPayment = data;         

          await this.clientS.getClientBoite(data.idClient).subscribe((cb) => {
            this.clientBoite = cb;
          });
        });

      }

    });
  }
  ngOnInit(): void {
  }

}
