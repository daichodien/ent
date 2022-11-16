/*********************************************************
 * File Name: AnnouncementService
 * Created By: hau.le
 * Created Date: 07/01/2020
 * Description: All service announcement
 *********************************************************/

import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';
import { Constants } from '../../../core/helpers/index';

@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {

  urlAPIAnnounce: string;

  constructor(private http: ApplicationHttpClient) {
    this.urlAPIAnnounce = `${http._urlAPIEnterprise}/announcement/`;
  }
  /**
   * Search list Announce by params
   * @param {Object} params parameter search data announcement
   * @returns {Array}
   */
  searchListAnnounceByParams(params: any) {
    const endPoint = `${this.urlAPIAnnounce}search`;
    return this.http
    .Post(endPoint, params)
    .map((response: Response) => response);
  }
  /**
   * Get detail announce by id
   * @param {Number} annId value id announce
   * @returns {Object}
   */
  getDetailAnnounceById(annId: number) {
    const endPoint = `${this.urlAPIAnnounce}getdetail/${annId}`;
    return this.http
    .Get(endPoint)
    .map((response: Response) => response);
  }
  /**
   * Insert new data announcement
   * @param {Object} params new data announcement
   * @returns {Boolean}
   */
  insertAnnouncement(params: any) {
    const endPoint = `${this.urlAPIAnnounce}insert`;
    return this.http
    .Post(endPoint, params)
    .map((response: Response) => response);
  }
  /**
   * Update data announcement by id
   * @param {Number} annId value id announcement
   * @returns {Boolean}
   */
  updateAnnounceById(params: any) {
    const endPoint = `${this.urlAPIAnnounce}update`;
    return this.http
    .Post(endPoint, params)
    .map((response: Response) => response);
  }
  /**
   * Delete data announcement by id
   * @param {Number} annId value id announcement
   * @returns {Boolean}
   */
  deleteAnnounceById(params: any) {
    const endPoint = `${this.urlAPIAnnounce}delete`;
    return this.http
    .Post(endPoint, params)
    .map((response: Response) => response);
  }
}