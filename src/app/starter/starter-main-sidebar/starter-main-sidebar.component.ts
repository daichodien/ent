import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';

@Component({
  selector: 'app-starter-main-sidebar',
  templateUrl: './starter-main-sidebar.component.html',
  styleUrls: ['./starter-main-sidebar.component.css']
})

export class StarterMainSidebarComponent implements OnInit {
  pageMenus: any;
  currentUser: any;
  languages:any;

  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || [];
    this.pageMenus = JSON.parse(localStorage.getItem('currentmenus')) || [];
    this.languages = JSON.parse(localStorage.getItem('languages')) || [];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // $('[data-widget="treeview"]').each(function() {
    //     AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    // });
  }

  show() {
    if (this.detectmob()) {
      $('body').addClass('sidebar-collapse');
      $('body').removeClass('sidebar-open');
    }
  }

  detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }else {
       return false;
     }
   }
}
