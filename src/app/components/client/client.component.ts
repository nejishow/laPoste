import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser, faBox, faMoneyBillWave, faExclamation } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  idUser;
  modify = false;
  faUser = faUser;
  faBox = faBox;
  faMoney = faMoneyBillWave;
  faExc = faExclamation;

  User = {
    name: 'Houssein',
    tel: '234567',
    address: 'Balbala',
    email: 'xx@gmail.com',
    sexe: 'Homme',
    bp: '234',
    photo: 'https://yscorporate.com/wp-content/uploads/2019/01/Photo-profil-professionnelle-par-photographe-entreprise10.jpg'
  }
  constructor(private aR: ActivatedRoute,
    private route: Router,
  ) {
    this.aR.params.subscribe(params => {
      this.idUser = params.id;
      // userS.getClient(this.id).subscribe((data: any) => {
      //   this.User = data[0];
      // });
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    //
  }

}
