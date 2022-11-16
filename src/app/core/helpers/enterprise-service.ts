/*********************************************************
 * File Name: API ENTERPRISE ENDPOINT
 * Created By: hau.le
 * Created Date: 07-01-2020
 * Description: return url endpoint api enterprise
 *********************************************************/

import {environment} from '../../../environments/environment';

export class EnterpriseService {
  
  private _isAuthenAPI: Boolean;
  private _endPoint: string;

  public getUrlEndPointApi(isAuthenAPI: Boolean, endPoint: string): string {

    if (isAuthenAPI === null || isAuthenAPI === undefined || !endPoint)
      return null;

    // Get url endpoint api
    this._isAuthenAPI = isAuthenAPI;
    this._endPoint = endPoint;
    return this.getUrlApi();
  }

  private getUrlApi(): string {
    let urlAPI: string;

    if (this._isAuthenAPI)
      urlAPI = environment.urlServiceSSO;
    else
      urlAPI = environment.urlEnterpriseService;

    return `${urlAPI}${this._endPoint}`;
  }
}