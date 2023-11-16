import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private API_URL  = 'https://megamaisbets.com.br/api';

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    return this.http.post(this.API_URL + '/auth/register', user, httpOptions);
  }
}
