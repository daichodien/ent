import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleHeaderPageService {

  private approvalStageMessage = new BehaviorSubject('');
  currentApprovalStageMessage = this.approvalStageMessage.asObservable();

  constructor() { }

  updateApprovalMessage(message: string) {
    this.approvalStageMessage.next(message)
  }
}
