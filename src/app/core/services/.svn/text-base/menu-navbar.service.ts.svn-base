import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MenuNavbarService {

  response: any = {};
  private messageResponse = new BehaviorSubject(this.response);
  // currentResponse = this.messageResponse.asObservable();

  constructor() { }

  setMessageResponse(data: any) {
    this.messageResponse = data;
  }

  getMessageResponse() {
    return this.messageResponse;
  }
}
