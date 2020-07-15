import { Component, OnInit } from '@angular/core';
import { faBoxes, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  faUser = faUser;
  constructor() { }

  ngOnInit(): void {
  }

}
