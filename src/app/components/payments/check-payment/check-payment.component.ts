import { ClientsService } from './../../../services/clients.service';
import { StaffsService } from './../../../services/staffs.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentsService } from './../../../services/payments.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    private aR: ActivatedRoute,
    private authS: AuthService
  ) {
    this.aR.params.subscribe(async params => {
      this.id = params.id;
      await this.payS.getPayment(this.id).subscribe((_data:any) => {
        this.payment = _data;
        this.staffS.getStaff(_data.idStaff).subscribe((data) => {
          this.staff = data;
        },
        (error) => {
          if (error.status === 401) {
            this.authS.logout();
          }
  
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
      },
      (error) => {
        if (error.status === 401) {
          this.authS.logout();
        }

      });

    });
  }

  ngOnInit(): void {
  }

}
