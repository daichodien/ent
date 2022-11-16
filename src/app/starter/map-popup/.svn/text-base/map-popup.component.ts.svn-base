import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CommonService } from '../../core/services/common.service';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
  styleUrls: ['./map-popup.component.css']
})
export class GooglemapComponent implements OnInit {
  dataSourceSearch:any = [];
  public event: EventEmitter<any> = new EventEmitter();
  // @Input() lat: number;
  // @Input() lng: number;
  zoom: number = 12;
  latitude: number = 10.827461;
  longitude: number = 106.619719;
  latofmarker:number = 10.827461;
  longofmarker: number = 106.619719;
  firstName:any;
  coordinate:any;
  markers: marker[] = [
    {
      lat: this.latofmarker,
      lng: this.longofmarker,
      label: 'A',
      draggable: true
    }
  ]
  constructor(public bsModalRef: BsModalRef,
    public modalService: BsModalService,
    public commonsv: CommonService
    ) {
    this.coordinate = modalService.config["initialState"];
    if (this.coordinate.lat !="" && this.coordinate.lng !="") {
      this.latitude = parseFloat(this.coordinate.lat);
      this.longitude =  parseFloat(this.coordinate.lng);
    }
    this.markers[0].lat = this.coordinate.lat =="" ? this.latitude : this.coordinate.lat;
    this.markers[0].lng = this.coordinate.lng =="" ? this.longitude : this.coordinate.lng;
  }

  ngOnInit() {

  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  placeMarker(e) {
    this.markers[0].lat = e.coords.lat;
    this.markers[0].lng =  e.coords.lng;
  }

  mapClicked($event: MouseEvent) {
  }

  markerDragEnd(m: marker, e) {
    this.markers[0].lat = e.coords.lat;
    this.markers[0].lng = e.coords.lng;
  }
  submit()
  {
    this.event.emit({
      lat: this.markers[0].lat ,
      lng: this.markers[0].lng
    });
    this.bsModalRef.hide();
  }
  searchPlaceGoogleMap(e)
  {
    this.commonsv.searchAutoComplete("a").subscribe(
      data=>
      {
          this.dataSourceSearch = data["results"];
      }
    )
  }
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
