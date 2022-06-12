import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPointConst } from '../../../constant/endpoint.const';
import { Observable } from 'rxjs';
import { HttpServerService } from 'src/app/service/http-server.service';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpServerService  ) { }

  getCovidStat(country?: string): Observable<any> {
    let endpoint = `${EndPointConst.GET_COVID_STAT}`;
    if (country) {
      endpoint = `${endpoint}?&country=${country}`;
    }
    return this.http.get(endpoint, {});
  }


  getCountryList(): Observable<any> {
    let endpoint = `${EndPointConst.GET_ALL_COUNTRY}`;
    return  this.http.get(endpoint);
  }

  getCovidHistory(country?: string): Observable<any> {
    let endpoint = `${EndPointConst.GET_COVID_HISTORY}?&country=${country ? country : 'all' }`;
    return  this.http.get(endpoint);
  }
  
}