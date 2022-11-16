import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { _const } from '../helpers';
import { Cacheable } from '../helpers/cacheable';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  division: Cacheable<any> = new Cacheable<any>();
  workLoc: Cacheable<any> = new Cacheable<any>();
  subsidiary: Cacheable<any> = new Cacheable<any>();
  subdepts: Cacheable<any> = new Cacheable<any>();
  stdcodes: Cacheable<any> = new Cacheable<any>();
  listEmployeeAll: Cacheable<any> = new Cacheable<any>();
  assetGroup: Cacheable<any> = new Cacheable<any>();

  isCaching: boolean = false;
  endPoint: string = '';


  // gallery: Cacheable<any> = new Cacheable<any>();
  // listhod: Cacheable<any> = new Cacheable<any>();

  getStatusCaching() {
    return this.isCaching;
  }

  setStatusCaching(status: boolean) {
    this.isCaching = status;
  }

  
  constructor(private http: HttpClient) {
    
    this.division.getHandler = () => {
      return this.http.get<any>(`${environment.urlServiceSSO}/api/ssocommonservice/divisions`).pipe(map((r: Response) => r));
    };
    this.workLoc.getHandler = () => {
      return this.http.get<any>(`${environment.urlServiceSSO}/api/mpi/commonservice/getworkLocs`).pipe(map((r: Response) => r));
    };
    this.subsidiary.getHandler = () => {
      return this.http.get<any>(`${environment.urlServiceSSO}/api/ssocommonservice/subsidiaries`).pipe(map((r: Response) => r));
    };
    this.subdepts.getHandler = () => {
      let currentuser = JSON.parse(localStorage.getItem(_const.LOCAL_STORAGE.CURRENT_USER)) || {};
      return this.http.get<any>(`${environment.urlServiceSSO}/api/ssocommonservice/subdepts/${currentuser['subsidiaryId']}`).pipe(map((r: Response) => r));
    };
    this.stdcodes.getHandler = () => {
      const stdCodeModel: any = {};
      stdCodeModel.listStdCode = this.stdcodes.getParam().join(',');
      if (stdCodeModel.listStdCode) {
        return this.http.post<any>(`${environment.urlServiceSSO}/api/common/getstdcodes`, stdCodeModel).pipe(map((r: Response) => r));
      }
      return EMPTY;
    };
    this.listEmployeeAll.getHandler = () => {
      const empModel: any = {};
      empModel.EmployeeName = "";
      empModel.Mobile = "";
      empModel.Subsidary = "";
      empModel.Division = "";
      empModel.Department = "";

      return this.http.post<any>(`${environment.urlServiceSSO}/api/mpi/employeeservice/employee/search`, empModel).pipe(map((r: Response) => r));
    };
    this.assetGroup.getHandler = () => {
      return this.http.get<any>(`${environment.urlServiceSSO}/api/mpi/assetsservice/assetgroups`).pipe(map((r: Response) => r));
    };

  }

  public getAssetGroupCache(): any {
    this.assetGroup.getData();
  }

  public getStdCodesCache(arr: string[]) {
    if (!arr || arr.length == 0) {
      return;
    }
    arr.forEach(item => {
      this.stdcodes.setParam(item);
    });
    this.stdcodes.getData();
  }

  public getSubsidiariesCache() {
    this.subsidiary.getData();
  }

  public getWorkLocCache() {
    this.workLoc.getData();
  }

  public getDivisionCache() {
    this.division.getData();
  }

  public getSubDeptsCache(): any {
      this.subdepts.getData();
  }

}
