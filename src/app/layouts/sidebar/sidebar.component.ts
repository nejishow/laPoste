import { AuthService } from './../../services/auth.service';
import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';
import { StaffsService } from './../../services/staffs.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  faTimes,
  faHome,
  faSignOutAlt,
  faSignInAlt,
  faUser,
  faBox,
  faChartLine,
  faBell,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

export interface RouteInfo {
  path: string;
  title: string;
  icon: any;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Acceuil',
    icon: faHome,
    class: '',
  },
  {
    path: '/clients',
    title: 'Clients actifs',
    icon: faUser,
    class: '',
  },
  {
    path: '/redClients',
    title: 'Clients inactifs',
    icon: faUser,
    class: 'text-danger',
  },
  {
    path: '/allBp',
    title: 'Boites postales',
    icon: faBox,
    class: '',
  },
  {
    path: '/stats',
    title: 'Statistiques',
    icon: faChartLine,
    class: '',
  },
  {
    path: '/notifications',
    title: 'Notifications',
    icon: faBell,
    class: '',
  },
  {
    path: '/activity',
    title: 'Activités',
    icon: faBell,
    class: '',
  },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  isSuperviseur;
  hasPower;
  isVisiteur;
  isAgent;

  MENU = [

    {
      path: '/allBp',
      title: 'Boites postales',
      hasPower: true,
      isSuperviseur: true,
      isVisiteur: true,
      icon: faBox,
      class: '',
    },
    {
      path: '/activity',
      title: 'Activités',
      hasPower: true,
      isSuperviseur: true,
      isVisiteur: true,
      isAgent: true,
      icon: faBell,
      class: '',
    },
  ];
  standard = [
    {
      path: '/dashboard',
      title: 'Acceuil',
      hasPower: false,
      isSuperviseur: false, icon: faHome,
      class: '',
    },
    {
      path: '/clients',
      title: 'Clients actifs',
      hasPower: false,
      isSuperviseur: false, icon: faUser,
      class: '',
    },
    {
      path: '/redClients',
      title: 'Clients inactifs',
      hasPower: false,
      isSuperviseur: false,
      icon: faUser,
      class: 'text-danger',
    },
  ];

  @Output() closed = new EventEmitter<boolean>();
  isAuth; // auth status
  faTimes = faTimes;
  faSignOut = faSignOutAlt;
  faSignIn = faSignInAlt;
  faCog = faCog;
  staff;
  public menuItems: any[];
  constructor(
    private staffS: StaffsService,
    private router: Router,
    private authS: AuthService
  ) { }
  ngOnInit() {
    this.menuItems = this.MENU.filter((menuItem) => menuItem);
    this.authS.Authenticated().subscribe((data) => {
      this.isAuth = data;
      this.isSuperviseur = this.authS.isSuperviseur;
      this.hasPower = this.authS.hasPower;
      this.isVisiteur = this.authS.isVisiteur;
      this.isAgent = this.authS.isAgent;
    });
    this.authS.getStaff().subscribe((data) => {
      this.staff = data;
      this.isSuperviseur = this.authS.isSuperviseur;
      this.hasPower = this.authS.hasPower;
    });
  }
  close(): any {
    this.closed.emit();
  }

  logout() {
    this.authS.logout();
  }
}
