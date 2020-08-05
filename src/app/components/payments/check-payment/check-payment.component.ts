import { ClientsService } from './../../../services/clients.service';
import { StaffsService } from './../../../services/staffs.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from './../../../services/payments.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-payment',
  templateUrl: './check-payment.component.html',
  styleUrls: ['./check-payment.component.css']
})
export class CheckPaymentComponent implements OnInit {
  id;
  payment;
  staff;
  forfaits = [];
  constructor(
    private payS: PaymentsService,
    private staffS: StaffsService,
    private clientS: ClientsService,
    private aR: ActivatedRoute
  ) {
    this.aR.params.subscribe(async params => {
      this.id = params.id;
      await this.payS.getPayment(this.id).subscribe((_data:any) => {
        this.payment = _data;
        this.staffS.getStaff(_data.staffs[0].idStaff).subscribe((data) => {
          this.staff = data;
        });
        this.clientS.getForfaits().subscribe((data:any) => {
          this.payment.forfaits.forEach(forfait => {
            data.forEach(element => {
              if (forfait.idForfait === element._id) {
                this.forfaits.push(element);
              }
            });
          });
        })
      });

    });
  }

  ngOnInit(): void {
  }

}
