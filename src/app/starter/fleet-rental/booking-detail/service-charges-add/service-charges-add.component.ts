import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Globalconst } from '../../../../core/helpers';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../../core/directives/base.component';
import { CommonService } from '../../../../core/services/common.service';
import { BookSvcChargeDto } from '../../../../core/models/booking/bookSvcChargeDto'
import { BookingService } from "../../../../core/services/booking.service";
import { data } from 'jquery';
import { CacheService } from '../../../../core/services/cache.service';

@Component({
  selector: 'app-service-charges-add',
  templateUrl: './service-charges-add.component.html',
  styleUrls: ['./service-charges-add.component.css']
})
export class ServiceChargesAddComponent extends BaseComponent {
  saveServiceChargeModel: any = {};
  listCurrency: any = [];
  listServiceItems:any = [];
  listAVT: any = [];
  VATamount: number = 0;
  isFirstLoad: boolean = true;

  bookSvcChargeDto: BookSvcChargeDto = new BookSvcChargeDto();
  @Output() reloadGrid: EventEmitter<any> = new EventEmitter()

  constructor(public router: Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    public commomService: CommonService,
    public bookingService: BookingService,
    private cacheService: CacheService,
  ) {
    super(router);
  }
  model: any = {};

  ngOnInit() {
    this.model = this.modalService.config["initialState"];
    this.loadInit();
   
    if (this.model && this.model.data && this.model.data.bscId != 0 ) {
      this.bookSvcChargeDto.serviceItem  = this.model.data.serviceItem;
      this.bookSvcChargeDto.itemDescription = this.model.data.itemDescription;
      this.bookSvcChargeDto.unitPrice = this.model.data.unitPrice;
      this.bookSvcChargeDto.currency =  this.model.data.currency;
      this.bookSvcChargeDto.TaxAmount = this.model.data.taxAmount;
      this.bookSvcChargeDto.TaxCode =this.model.data.taxCode;
    }
  }

  onValueVATChanged(event) {
    if(!this.isFirstLoad) {
      if (event.value ) {
        
        let tax = parseFloat(this.bookSvcChargeDto.TaxCode.substring(3,this.bookSvcChargeDto.TaxCode.length));
        this.bookSvcChargeDto.TaxAmount = (Number(tax) / 100) * this.bookSvcChargeDto.unitPrice;
      }
    }
    this.isFirstLoad = false;
  }

  onValueUnitPriceChanged(event) {
    if(!this.isFirstLoad) {
      if (event && event["event"] && typeof Number(event["event"]["key"] == "number" ) ) {
        
        let tax = parseFloat(this.bookSvcChargeDto.TaxCode.substring(3,this.bookSvcChargeDto.TaxCode.length));
        
        const result = (Number(tax) / 100) * Number(event["component"]["_formattedValue"].split(',').join(''));
        this.bookSvcChargeDto.TaxAmount = result;
      }
    }
    this.isFirstLoad = false;
  }

  loadInit() {
    // Set default VAT
    this.bookSvcChargeDto.TaxCode = "VAT08";
    this.getStdCodesCache();

    this.bookingService.getServiceItems().subscribe(data=>this.listServiceItems = data["payload"])
  }

  private getStdCodesCache() {

    this.cacheService.stdcodes.getData().subscribe(data => {
        if (data) {
          this.listCurrency = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'CURRENCY';
          });
          this.listAVT = data["payload"].filter(function (x) {
            return x.codeGroup.replace(/\s/g, "") == 'TAXCODE';
          });
        }
    });
  }
  Save() {
    this.bookSvcChargeDto.bookNo = this.model.bookNo;
    this.bookSvcChargeDto.bSCId = this.model.data.bscId;
    this.bookSvcChargeDto.userId = this.currentuser.employeeId;
    this.bookingService.saveBookSvcCharge(this.bookSvcChargeDto).subscribe(
      data => {
        if (data["payload"] > 0) {
          if (this.bookSvcChargeDto.bSCId==0) {
            this.toastr.success("Insert Service Charges sucessfull", "Service Charges")
          }
          else
          {
            this.toastr.success("Updated Service Charges sucessfull", "Service Charges")
          }
          
        }
        else {
          this.toastr.error('Save failed !', 'Service Charges')
        }
        this.reloadGrid.emit(null);
        this.bsModalRef.hide();
      },
      error => {
        this.toastr.error(error, 'Service Charges')
      }
    )
  }
 

}
