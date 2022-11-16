import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from './_base/http-client';

@Injectable({
  providedIn: 'root'
})
export class TaxAndInsuranceService {
  private urlAPI: string;

  constructor(private http: ApplicationHttpClient) {
    this.urlAPI = http._urlAPIEnterprise + "/mainternance/";
  }

  /* Tax And Insurance Start */
  searchTaxAndInsurances(model: any) {
    return this.http.Post(this.urlAPI + 'gettaxandinsurances', model).map((response: Response) => response);
  }

  deleteTaxAndInsurance(model: any) {
    return this.http.Post(this.urlAPI + 'deletetaxandinsurance', model).map((response: Response) => response);
  }

  saveTaxAndInsurance(model: any) {
    return this.http.Post(this.urlAPI + 'savetaxandinsurance', model).map((response: Response) => response);
  }

  updateTaxAndInsurance(model: any) {
    return this.http.Post(this.urlAPI + 'updatetaxandinsurance', model).map((response: Response) => response);
  }

  getTaxAndInsurance(id: any) {
    return this.http.Get(this.urlAPI + 'gettaxandinsurance?TIId=' + id).map((response: Response) => response);
  }
  /* Tax And Insurance End */


  /* Fleet Maintenance Start */
  searchFleetMaintenances(model: any) {
    return this.http.Post(this.urlAPI + 'getfleetmaintenances', model).map((response: Response) => response);
  }

  deleteFleetMaintenance(model: any) {
    return this.http.Post(this.urlAPI + 'deletefleetmaintenance', model).map((response: Response) => response);
  }

  getFleetMaintenance(id: any) {
    return this.http.Get(this.urlAPI + 'getfleetmaintenance?MTId=' + id).map((response: Response) => response);
  }

  saveFleetMaintenance(model: any) {
    return this.http.Post(this.urlAPI + 'savefleetmaintenance', model).map((response: Response) => response);
  }

  updateFleetMaintenance (model: any) {
    return this.http.Post(this.urlAPI + 'updatefleetmaintenance', model).map((response: Response) => response);
  }

  getFleetsMaintenance(model: any) {
    return this.http.Post(this.urlAPI + 'getfleets', model).map((response: Response) => response);
  }

  /* Fleet Maintenance End */


  /* Fleet Incident Start */
  searchFleetIncidents(model: any) {
    return this.http.Post(this.urlAPI + 'getfleetincidents', model).map((response: Response) => response);
  }

  deleteFleetIncident(model: any) {
    return this.http.Post(this.urlAPI + 'deletefleetincident', model).map((response: Response) => response);
  }

  saveFleetIncident(model: any) {
    return this.http.Post(this.urlAPI + 'savefleetincident', model).map((response: Response) => response);
  }

  updateFleetIncident(model: any) {
    return this.http.Post(this.urlAPI + 'updafleetincident', model).map((response: Response) => response);
  }

  getFleetIncident(id: any) {
    return this.http.Get(this.urlAPI + 'getfleetincident?AFId=' + id).map((response: Response) => response);
  }
  /* Fleet Incident End */

}
