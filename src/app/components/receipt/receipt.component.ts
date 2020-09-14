import { PaymentsService } from "src/app/services/payments.service";
import { OperationService } from "src/app/services/operation.service";
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ClientsService } from "src/app/services/clients.service";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.css"],
})
export class ReceiptComponent implements OnInit {
  date =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();
  id;
  newOperation;
  clientBoite;
  isOperation = false;
  isPayment = false;
  isAllOperation = false;
  total = 0; // total special pour allOperation
  newPayment;
  allPayment = [];
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private clientS: ClientsService,
    private opS: OperationService,
    private payS: PaymentsService
  ) {
    this.ar.params.subscribe(async (result) => {
      this.id = result.id;
      if (result.isOperation) {
        this.isOperation = true;

        await this.opS.getOperation(result.id).subscribe(async (data: any) => {
          this.newOperation = data;
          await this.clientS.getClientBoite(data.idClient).subscribe((cb) => {
            this.clientBoite = cb;
          });
        });
      } else if (result.isAllOperation) {
        this.isAllOperation = true;
        const arrayIds = result.array.split(',');

        for (let index = 0; index < arrayIds.length; index++) {          
          await this.payS
            .getPayment(arrayIds[index])
            .subscribe(async (data: any) => {
              this.allPayment.push(data);
              this.total += data.total;
              await this.allPayment.sort((a, b) => {
                if (a.date > b.date) {
                  return 1;
                }
                if (b.date > a.date) {
                  return -1;
                }
                return 0;
              });
              await this.clientS
                .getClientBoite(this.allPayment[0].idClient)
                .subscribe((cb) => {
                  this.clientBoite = cb;
                });
            });
        }
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
  ngOnInit(): void {}
}
