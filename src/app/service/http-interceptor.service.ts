import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError as observableThrowError, throwError } from 'rxjs';
import { catchError, switchMap, take, finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { EndPointConst } from '../../constants/end-point.const';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    request = request.clone({ setHeaders: { 'x-rapidapi-host': environment.xRapidApiHostValue, 'x-rapidapi-key':  environment.xRapidApiKeyValue} });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401 || error.status == 403) {
            this.router.navigate(['/unautorized'])
          }
        }
        return observableThrowError(error);
      })
    );

  }

}
