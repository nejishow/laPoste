import { SharedService } from './../../shared/shared.service';
import { Router } from '@angular/router';
import { StaffsService } from './../../services/staffs.service';
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
  { path: '/clients', title: 'Clients', icon: faUser, class: '' },
  { path: '/allBp', title: 'Boites postales', icon: faBox, class: '' },
  { path: '/stats', title: 'Statistiques', icon: faChartLine, class: '' },
  { path: '/notifications', title: 'Notifications', icon: faBell, class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() closed = new EventEmitter<boolean>();
  isAuth; // auth status
  faTimes = faTimes;
  faSignOut = faSignOutAlt;
  faSignIn = faSignInAlt;
  faCog = faCog;
  staff;
  public menuItems: any[];
  constructor(private staffS: StaffsService, private router: Router, private shareS: SharedService) {
  }
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.staffS.Authenticated().subscribe((data) => {
      this.isAuth = data;
    });
    this.staffS.getStaff().subscribe(data => {
      this.staff = data;
    });

  }
  close(): any {
    this.closed.emit();
  }

  logout() {
    this.staffS.logout();
  }

}
