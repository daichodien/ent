/*********************************************************
 * File Name: ExecCallApi
 * Created By: hau.le
 * Created Date: 07-01-2020
 * Description: Execute GET, POST, PUT, DELETE API
 *********************************************************/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApplicationHttpClient } from '../services/_base/http-client';
import { Helpers } from './helpers';

@Injectable()
export class ExecCallApi {

  private _endPoint: string;

  constructor(private _httpClient: ApplicationHttpClient) {}

  /**
   * GET data from API
   * @param {string} endPoint url api
   */
  getDataApi(endPoint: string): any {

    if (!this.checkUrlEndPoint(endPoint))
      return this._httpClient
      .Get(this._endPoint)
      .map((response: Response) => response)
      // .catch(error => Observable.of({ error: true }));
      .catch( this.handleError);
  }

  /**
   * GET data from API use ASYNC - AWAIT
   * @param {string} endPoint url API
   */
  async getAsyncDataApi(endPoint: string): Promise<any> {

    if (!this.checkUrlEndPoint(endPoint))
      return await this._httpClient
      .GetAsync(this._endPoint);
  }

  /**
   * POST data to API
   * @param {string} endPoint url API
   * @param {object} model data params post to API
   */
  postDataApi(endPoint: string, model: any): any {
    
    if (!this.checkUrlEndPoint(endPoint))
      return this._httpClient
      .Post(this._endPoint, model)
      .map((response: Response) => response);
  }

  /**
   * POST data to API use ASYNC - AWAIT
   * @param {string} endPoint url API
   * @param {object} model data params post to API
   */
  async postAsyncDataApi(endPoint: string, model: any): Promise<any> {
    
    if (!this.checkUrlEndPoint(endPoint))
      return await this._httpClient
      .PostAsync(this._endPoint, model);
  }

  /**
   * PUT data to API
   * @param {string} endPoint url API
   * @param {object} model data params post to API
   */
  putDataApi(endPoint: string, model: any): any {
    
    if (!this.checkUrlEndPoint(endPoint))
      return this._httpClient
      .Put(this._endPoint, model)
      .map((response: Response) => response);
  }

  /**
   * DELETE data to API
   * @param {string} endPoint url API
   * @param {object} model data params post to API
   */
  deleteDataApi(endPoint: string): any {
    
    if (!this.checkUrlEndPoint(endPoint))
      return this._httpClient
      .Delete(this._endPoint)
      .map((response: Response) => response);
  }

  private checkUrlEndPoint(endPoint: string): Boolean {
    this._endPoint = Helpers.getUrlEndPointApi(false, endPoint);
    return !this._endPoint;
  }

  private handleError = (error: Response) => {
    return Observable.throw(error.statusText);
  }
}