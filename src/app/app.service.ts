import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  API_URL  = 'https://megamaisbets.com.br/api';

  constructor(
    private http: HttpClient
  ) { }

  // createUser(): Observable<any> {

  // }
}
