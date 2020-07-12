import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Acceuil', icon: 'nc-bank', class: '' },
  { path: '/login', title: 'Se connecter', icon: 'nc-diamond', class: '' },
  { path: '/clients', title: 'Clients', icon: 'nc-pin-3', class: '' },
  { path: '/allBP', title: 'Boites postales', icon: 'nc-bell-55', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'nc-single-02', class: '' },
  { path: '/profil', title: 'Mon profil', icon: 'nc-single-02', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() closed = new EventEmitter<boolean>();

  faTimes = faTimes;
  public menuItems: any[];
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  close(): any {
    this.closed.emit();
  }

}
