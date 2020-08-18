import { StaffsService } from 'src/app/services/staffs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.css']
})
export class MyProfilComponent implements OnInit {

  staff;
  constructor(private staffS: StaffsService) {
    this.staffS.getStaff(localStorage.getItem('id')).subscribe((staff) => {
      this.staff = staff;
    })
  }

  ngOnInit(): void {
  }

}
