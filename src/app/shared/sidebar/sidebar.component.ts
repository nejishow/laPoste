import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes, faHome, faSignOutAlt, faSignInAlt, faUser, faBox, faChartLine, faBell, faCog } from '@fortawesome/free-solid-svg-icons';

export interface RouteInfo {
  path: string;
  title: string;
  icon: any;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Acceuil', icon: faHome, class: '' },
  { path: '/login', title: 'Se connecter', icon: faSignInAlt, class: '' },
  { path: '/clients', title: 'Clients', icon: faUser, class: '' },
  { path: '/allBp', title: 'Boites postales', icon: faBox, class: '' },
  { path: '/stats', title: 'Statistiques', icon: faChartLine, class: '' },
  { path: '/notifications', title: 'Notifications', icon: faBell, class: '' },
  { path: '/profil', title: 'Mon profil', icon: faCog, class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() closed = new EventEmitter<boolean>();

  faTimes = faTimes;
  faSignOut = faSignOutAlt;
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  close(): any {
    this.closed.emit();
  }

}
