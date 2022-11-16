import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Globalconst } from '../../core/helpers';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.css']
})
export class PreviewImageComponent  implements OnInit {
  
  public event: EventEmitter<any> = new EventEmitter();
  constructor(public router:Router,
    public modalService: BsModalService,
    public _global: Globalconst,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public bsModalRef: BsModalRef,
    ) {

  }
  model:any={};
  ngOnInit() {
    
    this.model = this.modalService.config["initialState"];
  }

  RemoveImage(index)
  {
    this.event.emit(index);
    this.bsModalRef.hide();
  }
}
