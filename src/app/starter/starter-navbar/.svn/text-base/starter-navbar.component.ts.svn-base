import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globalconst } from '../../core/helpers';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';
import { TitleHeaderPageService } from '../../core/services/title-header-page.service';
@Component({
  selector: 'app-starter-navbar',
  templateUrl: './starter-navbar.component.html',
  styleUrls: ['./starter-navbar.component.css']
})
export class StarterNavbarComponent implements OnInit {
  currentUser: any = {};
  name: string;
  avatar: any = {};
  isShowMenuHamburger: boolean = true;
  titleHeader: string = '';

  constructor(private router: Router, public globals: Globalconst , private appService: TitleHeaderPageService,) { }

  ngOnInit() {
    this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    this.appService.updateApprovalMessage("DashBoard");
    this.avatar.src = localStorage.getItem('imgAvatar');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['/login'], { queryParams: { logout: true } });
  }
  userProfile() {
    this.router.navigate(['admin/userprofile']);
  }
  ngAfterViewInit() {
  }

  triggerMenuHamburger(event) {
    // Menu need minimize
    if(this.isShowMenuHamburger) {
      $('.brand-image').removeClass('logo-navbar-show');
      $('.brand-image').addClass('logo-navbar-hidden');
      $('body').addClass("sidebar-collapse");
      $('body').removeClass("sidebar-open");
    } else {
      $('.brand-image').removeClass ('logo-navbar-hidden');
      $('.brand-image').addClass('logo-navbar-show');
      $('body').removeClass("sidebar-collapse");
      $('body').addClass("sidebar-open");
    }
    this.isShowMenuHamburger = !this.isShowMenuHamburger;
  }
}
