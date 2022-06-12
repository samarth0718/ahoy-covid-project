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

  // var myArray = [
  //   {date: "2017-01-01", num: 2},
  //   {date: "2017-01-02", num: 3},
  //   {date: "2017-02-04", num: 6},
  //   {date: "2022-02-05", num: 15}
  // ],
  //   groupKey = 0;
  //   let fillter = myArray.filter(data => ('2017' == data.date.split(('-'))[0]));
  //   console.log(fillter);
    
  //   groups = myArray.reduce((r: any, o: any) => {
  //       var m = o.date.split(('-'))[1];
  //       var y = o.date.split(('-'))[0];
  //       if (y == '2017') {
  //       (r[m])? r[m].data += o.num : r[m] = {group: String(groupKey++), data: o.num};
  //       return r;
  //       }
  //   }, {});
  //   console.log(groups);