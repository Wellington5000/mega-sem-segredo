import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../environment/environment';
import { Lotofacil } from '../models/lotofacil';
import { Combinations } from '../models/combinations';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(
    private http: HttpClient
  ) { }

  getCombinations(): Observable<Combinations> {
    return this.http.get<Combinations>(ENVIRONMENT + 'v3/matriz/LF');
  }

  getCombinationsById(id: number): Observable<any> {
    return this.http.get(ENVIRONMENT + 'v3/matriz/exibir/' + id);
  }

  createCombinations(body: Lotofacil): Observable<any> {
    return this.http.post(ENVIRONMENT + 'v3/matriz/gerar', body);
  }
}
