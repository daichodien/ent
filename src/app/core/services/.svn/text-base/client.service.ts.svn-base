import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient) { }

  public getClientIPAddress()  
  {  
    return this.http.get("https://api.ipdata.co?api-key=be0f755b93290b4c100445d77533d291763a417c75524e95e07819ad");  
  }

  public getClientIPAddressServerBackup() {
    return this.http
          .get('https://jsonip.com/')
          .pipe(map(response => response || {}))
  }

  public getClientIPAddressServerBackup2() {
    return this.http
          .get('https://api.ipify.org?format=jsonp')
          .pipe(map(response => response || {}))
  }

  public getClientIPAddressServerBackup3() {
    return this.http
          .get('https://api.ipinfodb.com/v3/ip-city/?format=json&key=25864308b6a77fd90f8bf04b3021a48c1f2fb302a676dd3809054bc1b07f5b42')
          .pipe(map(response => response || {}))
  }

}
