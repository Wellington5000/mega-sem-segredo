import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concourse } from './models/concourse';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_URL  = 'https://megamaisbets.com.br/api/';

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + 'auth/register', user, httpOptions);
  }

  createPaymentByCreditCard(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + data?.auth,
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + 'v2/pagamento/checkout/pagar-cartao', data.body, httpOptions);
  }

  createPaymentByPix(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + data?.auth,
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + 'v2/pagamento/checkout/gerar-qr-code', data.body, httpOptions);
  }

  findAllHits(): Observable<Concourse> {
    return this.http.get<Concourse>(this.API_URL + 'concursos-acertos-grupos');
  }

  findHitsByCode(concurso: string): Observable<Concourse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post<Concourse>(this.API_URL + 'concursos-acertos-grupos', { concurso: concurso }, httpOptions);
  }

  findAllPromotions(): Observable<any> {
    return this.http.get(this.API_URL + 'promocoes');
  }

  findPromotionByCode(code: string): Observable<any> {
    return this.http.post(this.API_URL + 'promocoes', { codigo: code });
  }

  downloadReportOrReceipt(group: number, type: string): Observable<Blob> {
    return this.http.get(this.API_URL + `promocoes/download/${group}/${type}`, {
      responseType: 'blob'
    });
  }

  downloadConcourse(concourse: number): Observable<Blob> {
    return this.http.get(this.API_URL + `concursos-acertos-grupos/download/${concourse}`, {
      responseType: 'blob'
    });
  }

  checkPaymentByPix(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + data?.auth,
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + 'v2/pagamento/checkout/verificar-pix', {}, httpOptions);
  }

  checkCouponIsValid(coupon: string): Observable<any> {
    return this.http.post(this.API_URL + 'pagamento/checkout/validar-cupom', { cupom: coupon });
  }

  downloadPremiado(concourse: number): Observable<Blob> {
    return this.http.get(this.API_URL + `concursos-acertos-grupos/download-premiado/${concourse}`, {
      responseType: 'blob'
    });
  }
}
