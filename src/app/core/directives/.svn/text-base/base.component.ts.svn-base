import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
declare var AdminLTE: any;
declare var $: any;
@Injectable()
export class BaseComponent implements OnInit {
    IsSubmit: boolean = false ;// Disable submit/save/update button after click to void issue double click
    QueryPara: any;
    languages: any;
    currentuser: any;
    toastrbs: ToastrService;
    constructor(
        public router: Router,

    ) {
        this.languages = JSON.parse(localStorage.getItem('languages')) || {};
        this.currentuser = JSON.parse(localStorage.getItem('currentUser')) || {};
        if (environment.production) {
            this.CheckPermission();
        }

    }

    ngOnInit() {
        AdminLTE.init();
    }
    CheckPermission() {
        let isHasPermission = false;
        let currentUrl: string = this.router.url;
        var menus = JSON.parse(localStorage.getItem('currentmenus'))||[];
        
        menus.forEach(element => {
            element.menuChils.forEach(element => {
                if (currentUrl.indexOf(element.component) > 0) {
                    isHasPermission = true;
                    return true;
                }
            });
        });

        // if (!isHasPermission) {
        //     alert("You don't have permisson to access this page!");
        //     this.router.navigate(['intranet/dashboard']);
        // }
    }
    ngAfterViewInit() {
    //     $('input').iCheck({
    //         checkboxClass: 'icheckbox_square-aero',
    //         radioClass: 'iradio_square-aero'
    //   });
    }
}
