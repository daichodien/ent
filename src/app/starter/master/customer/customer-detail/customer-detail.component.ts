import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../core/directives/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../../core/services/master/customer.service';
import { CustomerModel, CustomerDto } from '../../../../core/models/master/Customer';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../../core/services/common.service';
import { FileuploadComponent } from '../../../../core/directives';
import { REFDOCTYPE } from '../../../../core/helpers';
import { UserService } from '../../../../core/services';
import { BookingService } from '../../../../core/services/booking.service';
import { TitleHeaderPageService } from '../../../../core/services/title-header-page.service';
import { CacheService } from '../../../../core/services/cache.service';

declare var AdminLTE: any;
declare var $: any;

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent extends BaseComponent {
  @ViewChild(FileuploadComponent)
  private fileUpload: FileuploadComponent;
  cusId: string = "0";
  data: any = {};
  customerModel: CustomerDto = new CustomerDto();
  listCustomerType: any = [];
  showTabHistory: boolean = true;
  dataSource: any = {};
  countries: any = [];
  titleHeader: string = '';
  titles: any = ["Mr", "Ms", "Mrs"];
  listIdTypes: any =[];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  todate = new Date();

  constructor(public router: Router,
    private routeact: ActivatedRoute,
    private userService: UserService,
    public toastr: ToastrService,
    public _commonService: CommonService,
    public _bookingService: BookingService,
    private appService: TitleHeaderPageService,
    private cacheService: CacheService,
    private _customerService: CustomerService) {
    super(router);
    this.cusId = this.routeact.params["_value"].id;
  }

  ngAfterViewInit() {
    this.appService.updateApprovalMessage("Customer Detail");
  }

  ngOnInit() {
    // this.appService.currentApprovalStageMessage.subscribe(msg => this.titleHeader = msg);
    
    this.fileUpload.refNoType = REFDOCTYPE.Customer;
    this.fileUpload._userId = this.currentuser.employeeId;
    AdminLTE.init();
    this.loadInit();
    this.loadJquery();
    this.getbooking();

    this.routeact.params.subscribe(async params => {
      try {
        this.cusId = params['id'];
        if (this.cusId != "0") {
          this.getCustomerById(this.cusId);
          this.fileUpload.autoSave = true;
          this.fileUpload.refNoValue = this.cusId;
          this.fileUpload.loadFiles();
        }
        else {
          //add default value for add new 
          this.showTabHistory = false;
          this.customerModel.svcPkgDtlId = 1;
          this.fileUpload.autoSave = false;
        }
      } catch (e) {
      }
    });
  }


  checkPagePermission(pageName: string) {
    return this.userService.checkPermissionPage(pageName);
  }

  getbooking(){
    //format day
    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
    function formatDate(date: Date) {
      return (
        [
          date.getFullYear(),
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
        ].join('') 
      );
    }
    var toDate = formatDate(this.todate)

    let modelOption = {
      BookDateF: "20001014",
      BookDateT: toDate,
      BookNo: "",
      BookStatus: "",
      BranchCode: "",
      CustId: this.routeact.params["_value"].id,
      DateF: "2000-10-13T17:00:00.000Z",
      DateT: "2022-10-14T03:11:51.231Z" ,
      FleetModel: "",
      FleetType: "",
      UserId: "1",
      bookType: "",
      cusType: "",
      driverId: "",
      fleetDesc: "",
      fleetUseType: "",
      getByBookDate: 1,
      staffId: "",
      dateType: "BOOKDATE",
      
    }
    this._bookingService.search(modelOption).map(response => {
      let lastest = [];
       lastest = response['payload'];
       return lastest.splice(lastest.length-11,lastest.length-1);
      }).subscribe(
      data => {
        this.dataSource = data;
      }
    )
  }

  viewDetail(id: string) {
    this.router.navigate(['admin/fl/booking/' + id]);
  }

  loadJquery() {
    var isTop = false;
    var menuIsOpen = true;

    var menuIcon = $('.va_menu_icon');

    var one = $('#one');
    var two = $('#two');
    var three = $('#three');
    var four = $('#four');

    $('#nav').animate({ top: '50%', left: '50%' }, 400);
    $('.content-tree-view').animate({ opacity: '0' }, 700);
    showBubbles();

    menuIcon.click(function() {
      if (isTop === true) {
        $('#nav').animate({ top: '50%', left: '50%' }, 400);
        $('.content-tree-view').animate({ opacity: '0' }, 700);
        showBubbles();
        isTop = false;
      } else {
        if (menuIsOpen === false) {
          showBubbles();
        } else {
          hideBubbles();
        }
      }
    });

    function showBubbles() {
      menuIcon.addClass('is-active');

      one.animate({ opacity: '1' }, 10);
      two.animate({ opacity: '1' }, 10);
      three.animate({ opacity: '1' }, 10);
      four.animate({ opacity: '1' }, 10);
      setTimeout(() => {
        one.css("display", "block");
        two.css("display", "block");
        three.css("display", "block");
        four.css("display", "block");
      }, 100);
      

      one.animate({ left: '180px' }, 110);
      two.animate({ top: '170px' }, 200);
      one.animate({ left: '170px' }, 100);
      three.animate({ left: '-110px' }, 300);
      two.animate({ top: '160px' }, 210);
      four.animate({ top: '-100px' }, 400);
      three.animate({ left: '-100px' }, 310);
      four.animate({ top: '-90px' }, 400);

      menuIsOpen = true;
    }

    function hideBubbles() {
      menuIcon.removeClass('is-active');

      setTimeout(function() {
        $('#nav').animate({ top: '100px', left: '100px' }, 400);
        $('.content-tree-view').animate({ opacity: '1' }, 900);
      }, 500);
      four.animate({ top: '-65px' }, 400);
      three.animate({ left: '-65px' }, 300);
      four.animate({ top: '50%' }, 400);
      two.animate({ top: '140px' }, 200);
      three.animate({ left: '50%' }, 310);
      one.animate({ left: '140px' }, 110);
      two.animate({ top: '50%' }, 200);
      one.animate({ left: '50%' }, 110);
      
      // one.animate({ opacity: '0' }, 10);
      // two.animate({ opacity: '0' }, 10);
      // three.animate({ opacity: '0' }, 10);
      // four.animate({ opacity: '0' }, 10);
      setTimeout(() => {
        one.css("display", "none");
        two.css("display", "none");
        three.css("display", "none");
        four.css("display", "none");
      }, 500);
      

      menuIsOpen = false;
      isTop = true
    }

    $('.bubble').click(function() {
      menuIcon.removeClass('is-active');
      hideBubbles();
      setTimeout(function() {
        $('#nav').animate({ top: '100px', left: '100px' }, 400);
      }, 500);
      isTop = true;
    });

    one.click(function() {
      moveToPage('0', '100vw', '-100vw', '-100vw');
    });

    two.click(function() {
      moveToPage('100vw', '0', '-100vw', '-100vw');
    });

    three.click(function() {
      moveToPage('100vw', '100vw', '0', '-100vw');
    });

    four.click(function() {
      moveToPage('100vw', '100vw', '-100vw', '0');
    });

    function moveToPage(firstLeft, secondTop, thirdLeft, fourthTop) {
      $('.first').animate({ left: firstLeft }, 400);
      $('.second').animate({ top: secondTop }, 400);
      $('.third').animate({ left: thirdLeft }, 400);
      $('.fourth').animate({ top: fourthTop }, 400);

      isTop = true;
    }
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listCustomerType = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMCUSTTYPE';
          });
          this.listIdTypes = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'FMLICCLASS';
          });
        }
    });
  }

  loadInit() {
    this.getStdCodesCache();
     
    this._commonService.getCountries().subscribe(data => this.countries = data["payload"]);

  }
  

  // getCustomer() {
  //   if (this.cusId != "0") {
  //     this._customerService.getCustomer(this.cusId).subscribe(data => {
  //       data["success"] == true ? this.customerModel = data["payload"] : this.toastr.error("Error:", "Customer");
  //     },
  //     error => this.toastr.error(error, "Customer"))
  //   }
  // }

  getCustomerById(id: any) {
    if (this.cusId != "0") {
      this._customerService.getCustomer(id).subscribe(data => {
        Object.assign(this.customerModel, data['payload']);
      })
    }
  }
  formatDate(data) {
    return this._commonService.convertMilisecondToUTCDateTime(data);
  }
  save() {
    this.customerModel.createUser = this.currentuser.employeeId;
    this.customerModel.userId = this.currentuser.employeeId;

    if (this.cusId == "0") {
      this._customerService.saveCustomer(this.customerModel).subscribe(
        data => {
          if (data["success"] == true && data["payload"] > 0) {
            this.toastr.success('Insert Customer successfully!', 'Customer');
            this.cusId = data["payload"];
            this.router.navigate(['admin/master/customer/' + data["payload"]]);
          } else {
            this.toastr.error('Insert Customer failed!', 'Customer')
          }
        },
        error => {
          this.toastr.error(error, 'Customer')
        })
    } else {
      this._customerService.updateCustomer(this.customerModel).subscribe(
        data => {
          if (data["success"] == true) {
            this.toastr.success('Update Customer successfully!', 'Customer');
            this.router.navigate(['admin/master/customer/' + this.cusId]);
          } else {
            this.toastr.error('Update Customer failed!', 'Customer')
          }
        },
        error => {
          this.toastr.error(error, 'Customer')
        }
      )
    }
  }

  back() {
    this.routeact.queryParams.subscribe(params => {
      this.router.navigate(['admin/master/customer'], { queryParams: params })
      params = [];
    });
  }
  changeCustType(custType) {
    this.customerModel.cusType = custType;
  }
  formvalid(f)
  {
    f.onSubmit();
    if(f.valid)
    {
      this.save();
    }
  }
}
