import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { routes } from '../app.routes';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidemenuComponent,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {

  public menuitem = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path && route.icon)
  .filter(route => !route.path?.includes(':'))

  title = 'material-responsive-sidenav';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = false;
  constructor(private observer: BreakpointObserver) {}
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }
}
