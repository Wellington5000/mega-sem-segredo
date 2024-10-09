import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';
import { AppService } from './app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private spinnerService: SpinnerService, 
    private appService: AppService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const showSpinner = !req.headers.has('nonloading');
    
    if (showSpinner) {
      this.spinnerService.show();
    }

    let headersConfig: any = {
      Accept: 'application/json'
    };

    const token = localStorage.getItem('access-token');
    if (token) {
      headersConfig = { 
        ...headersConfig, 
        Authorization: `Bearer ${token}`
      };
    }

    const authReq = req.clone({
      setHeaders: headersConfig,
      headers: req.headers.delete('nonloading')
    });

    return next.handle(authReq).pipe(
      finalize(() => {
        if (showSpinner) {
          this.spinnerService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (showSpinner) {
          this.spinnerService.hide();
        }

        if (error.status === 401 || error.status === 419) {
          this.appService.logout();
        }

        return throwError(() => error);
      })
    );
  }
}
