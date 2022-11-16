import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from '../_base/http-client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebPortalService {
  private urlAPI: string;

  constructor(private http: ApplicationHttpClient) {
    this.urlAPI =  environment.urlEnterpriseService + "/webportal/";
  }

  searchArticles(model: any) {
    return this.http.Post(this.urlAPI + 'getwparticles', model).map((response: Response) => response);
  }

  deleteArticle(model: any) {
    return this.http.Post(this.urlAPI + 'deletearticle', model).map((response: Response) => response);
  }

  saveArticle(model: any) {
    return this.http.Post(this.urlAPI + 'savearticle', model).map((response: Response) => response);
  }

  updateArticle(model: any) {
    return this.http.Post(this.urlAPI + 'updatearticle', model).map((response: Response) => response);
  }

  getArticle(id: any) {
    return this.http.Get(this.urlAPI + 'getarticle?id=' + id).map((response: Response) => response);
  }

}