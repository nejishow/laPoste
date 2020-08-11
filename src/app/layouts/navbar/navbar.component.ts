import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  faBars = faBars;
  faBell = faBell;
  public isCollapsed = true;
  @ViewChild('app-navbar', { static: false }) button;
  @Output() toggled = new EventEmitter<boolean>();
  ROUTES = [
    { path: '/dashboard', title: 'Acceuil'},
    { path: '/login', title: 'Se connecter'},
    { path: '/clients', title: 'Tous les clients' },
    { path: '/client/', title: 'Profil du client' },
    { path: '/addClient', title: 'Ajouter un client' },
    { path: '/redClients', title: 'Les clients en attente de resiliation' },
    { path: '/allBp', title: 'Toutes les boites postales' },
    { path: '/bp/', title: 'Informations sur la boite' },
    { path: '/addBP', title: 'Ajouter une boite postale' },
    { path: '/notifications', title: 'Notifications' },
    { path: '/profil', title: 'Mon profil' },
    { path: '/stats', title: 'Statistiques' },
    { path: '/checkPayment/', title: 'Paiement' },
    { path: '/activity', title: 'Les activités enregistrées' }
  ];

  constructor(location: Location, private element: ElementRef, private router: Router) {
    this.location = location;
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.listTitles = this.ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;

  }
  toggle(): any {
    this.toggled.emit();
  }
  getTitle(): string {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    // tslint:disable-next-line: prefer-for-of
    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee || titlee.includes(this.listTitles[item].path)) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

}
