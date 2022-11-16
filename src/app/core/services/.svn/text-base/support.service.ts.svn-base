import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  private urlAPI: string;
  data: any

  constructor(private http: ApplicationHttpClient) {
    this.urlAPI = http._urlAPIEnterprise + "/support/";
  }

  getAprroveTripRecords(model: any) {
    return this.http.Post(this.urlAPI + 'getaprrovetriprecords', model).map((response: Response) => response);
  }

  saveApproveTripRecords(model: any) {
    return this.http.Post(this.urlAPI + 'saveapprovetriprecord', model).map((response: Response) => response);
  }

  updateApproveTripRecord(model: any) {
    return this.http.Post(this.urlAPI + 'updateapprovetriprecord', model).map((response: Response) => response);
  }

  getTripVerifies(id: any) {
    return this.http.Get(this.urlAPI + 'gettripverifies?Id=' + id).map((response: Response) => response);
  }

  saveTripVerifies(model: any) {
    return this.http.Post(this.urlAPI + 'saveverifytriprecord', model).map((response: Response) => response);
  }

  getToday() {
    return this.http.Get(this.urlAPI + "frgettoday?UserId=1").map((response: Response) => response);
  }

  updateApproveTripRecordFee(model: any) {
    return this.http.Post(this.urlAPI + 'saveapprovetriprecordfee', model).map((response: Response) => response);
  }

  getTripRecordAprrovedFees(model: any) {
    return this.http.Post(this.urlAPI + 'gettriprecordaprrovedfees', model).map((response: Response) => response);
  }

  getCheckListInspectionResult(model: any) {
    return this.http.Post(this.urlAPI + 'getchecklistinspectionresult', model).map((res: Response) => res);
  }

  getCheckListInspections(model: any) {
    return this.http.Post(this.urlAPI + 'getchecklistinspection', model).map((res: Response) => res);
  }

  getCheckListInspectionDetail(model: any) {
    return this.http.Post(this.urlAPI + 'getchecklistinspectiondetail', model).map((res: Response) => res);
  }

  GetFleetByCustomer(id: any) {
    return this.http.Get(this.urlAPI + 'GetFleetByCustomer/?id=' + id).map((res: Response) => res);
  }

  getVerifiedTripRecords(model: any) {
    return this.http.Post(this.urlAPI + 'gettriprecordverify', model).map((response: Response) => response);
  }

  deleteVerifiedTripRecord(model: any) {
    return this.http.Post(this.urlAPI + 'deletetriprecordverify', model).map((response: Response) => response);
  }

  searchCustomerTickets(model: any) {
    return this.http.Post(this.urlAPI + 'getcustomertickets', model).map((response: Response) => response);
  }

  deleteCustomerTicket(model: any) {
    return this.http.Post(this.urlAPI + 'deletecustomerticket', model).map((response: Response) => response);
  }

  saveCustomerTicket(model: any) {
    return this.http.Post(this.urlAPI + 'savecustomerticket', model).map((response: Response) => response);
  }

  updateCustomerTicket(model: any) {
    return this.http.Post(this.urlAPI + 'updatecustomerticket', model).map((response: Response) => response);
  }

  getCustomerTicket(id: any) {
    return this.http.Get(this.urlAPI + 'getcustomerticket/' + id).map((response: Response) => response);
  }
  getEmployeeForIncident() {
    return this.http.Get(this.urlAPI + 'getemployeeforincident').map((response: Response) => response);
  }
  getIncidentLogsById(InNo, actionType) {
    return this.http.Get(this.urlAPI + `getincidentlogsbyid/${InNo}`).map((response: Response) => response);
  }
  saveIncidentLog(model: any) {
    return this.http.Post(this.urlAPI + 'saveincidentlog', model).map((response: Response) => response);
  }
  UpdateStatusIncident(model: any) {
    return this.http.Post(this.urlAPI + 'updatestatusincident', model).map((response: Response) => response);
  }

  deleteChecklistInsitem(model: any) {
    return this.http.Post(this.urlAPI + 'deletechecklistinsitem', model).map((response: Response) => response);
  }

}
