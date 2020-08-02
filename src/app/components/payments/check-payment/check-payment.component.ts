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
  constructor(
    private payS: PaymentsService,
    private aR: ActivatedRoute
  ) {
    this.aR.params.subscribe(async params => {
      this.id = params.id;
      await this.payS.getPayment(this.id).subscribe((data) => {
        this.payment = data;
      });
    });
  }

  ngOnInit(): void {
  }

}
