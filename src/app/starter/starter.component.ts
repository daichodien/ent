import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { } from 'jquery';
import { } from 'admin-lte';
import * as AdminLte from 'admin-lte';
declare var $: any;
@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent implements OnInit, OnDestroy, AfterViewInit {

  body: HTMLBodyElement = document.getElementsByTagName('body')[0];
  adminLte: JQuery;

  constructor() { }

  ngAfterViewInit(): void {

    // debugger;
    $('[data-widget="treeview"]').each(function() {
        AdminLte.Treeview._jQueryInterface.call($(this), 'init');
    });
    // AdminLte.Treeview._jQueryInterface.call($('[data-widget="treeview"]')[0], 'init');
    // AdminLte.PushMenu._jQueryInterface.call($('[data-widget="pushmenu"]')[0], 'init');
    //$('[data-widget="pushmenu"]').PushMenu();
    // $('[data-toggle="push-menu"]').PushMenu();
    // $('[data-widget="treeview"]').Treeview();
    // $('[data-toggle="control-sidebar"]').ControlSidebar();
  }

  ngOnInit() {
    
    this.body.classList.add('sidebar-mini');
    // this.body.classList.add('sidebar-collapse');
    
  }

  ngOnDestroy() {
    // remove the the body classes
    //this.body.classList.remove('sidebar-mini');
  }
 
}
