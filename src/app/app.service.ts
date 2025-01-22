import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concourse } from './models/concourse';
import { Router } from '@angular/router';
import { Signature } from './models/signature';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_URL  = 'https://megamaisbets.com.br/api/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: SocialAuthService,
  ) { }

  createUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + 'auth/register', user, httpOptions);
  }

  createUserWithoutPassword(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + 'v3/pagamento/checkout/registrar-usuario', user, httpOptions);
  }

  createPaymentByCreditCard(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'v3/pagamento/checkout/pagar-cartao', data.body);
  }

  createPaymentByPix(data: any): Observable<any> {
    return this.http.post(this.API_URL + 'v3/pagamento/checkout/gerar-qr-code', data);
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

  findAllPromotions(lotteryCode: string): Observable<any> {
    return this.http.get(this.API_URL + `v3/promocoes/${lotteryCode}/grupos`);
  }

  findPromotionByCode(code: string): Observable<any> {
    return this.http.post(this.API_URL + 'promocoes', { codigo: code });
  }

  downloadReportOrReceipt(group: number, type: string): Observable<Blob> {
    return this.http.get(this.API_URL + `promocoes/download/${group}/${type}`, {
      responseType: 'blob'
    });
  }

  downloadProofCombinations(id: string): Observable<Blob> {
    return this.http.get(this.API_URL + `v3/promocoes/grupos/download/${id}/combinacoes`, {
      responseType: 'blob'
    });
  }

  downloadProofPayments(id: string): Observable<Blob> {
    return this.http.get(this.API_URL + `v3/promocoes/grupos/download/${id}/pagamento`, {
      responseType: 'blob'
    });
  }

  downloadProofSuccess(id: string): Observable<Blob> {
    return this.http.get(this.API_URL + `v3/promocoes/grupos/download/${id}/acertos`, {
      responseType: 'blob'
    });
  }

  downloadConcourse(concourse: number): Observable<Blob> {
    return this.http.get(this.API_URL + `concursos-acertos-grupos/download/${concourse}`, {
      responseType: 'blob'
    });
  }

  downloadRegulation(lotteryCode: string): Observable<Blob> {
    return this.http.get(this.API_URL + `promocoes/${lotteryCode}/download-regulamento`, {
      responseType: 'blob'
    });
  }

  checkPaymentByPix(id: number): Observable<any> {
    return this.http.post(this.API_URL + 'v3/pagamento/checkout/verificar-pix/' + id, {}, {
      headers: new HttpHeaders({
        'nonloading': 'true'
      })
    });
  }

  checkCouponIsValid(coupon: string): Observable<any> {
    return this.http.post(this.API_URL + 'pagamento/checkout/validar-cupom', { cupom: coupon });
  }

  downloadPremiado(concourse: number): Observable<Blob> {
    return this.http.get(this.API_URL + `concursos-acertos-grupos/download-premiado/${concourse}`, {
      responseType: 'blob'
    });
  }

  createCookie(): Observable<any> {
    return this.http.get('https://megamaisbets.com.br/sanctum/csrf-cookie');
  }

  checkEmail(body: any): Observable<any> {
    return this.http.post(this.API_URL + 'auth/verify-email', body);
  }

  login(body: any): Observable<any> {
    return this.http.post(this.API_URL + 'auth/login', body);
  }

  getUserCredit(): Observable<any> {
    return this.http.get(this.API_URL + 'v3/usuario/get-creditos');
  }

  getLasResults(): Observable<any> {
    return this.http.get(this.API_URL + 'concursos/ultimos');
  }

  logout(): void {
    this.authService.signOut();
    localStorage.removeItem('access-token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('access-token');
    return !!token;
  }

  googleLogin(body: any): Observable<any> {
    return this.http.post(this.API_URL + 'auth/google', body);
  }

  facebookLogin(body: any): Observable<any> {
    return this.http.post(this.API_URL + 'auth/facebook', body);
  }

  getSignature(): Observable<Signature> {
    return this.http.get<Signature>(this.API_URL + 'v3/signature/check');
  }

  recoveryPassword(body: any): Observable<any> {
    return this.http.post(this.API_URL + 'auth/forgot-password', body);
  }
}
