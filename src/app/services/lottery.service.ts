import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Lotofacil } from '../models/lotofacil';
import { Combinations } from '../models/combinations';

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  constructor(
    private http: HttpClient
  ) { }

  getCombinations(lottery: string): Observable<Combinations> {
    return this.http.get<Combinations>(environment + 'v3/matriz/' + lottery);
  }

  getCombinationsByConcourses(lottery: string, from: number, to: number): Observable<any> {
    return this.http.get(environment + `v3/matriz/concursos/${ lottery }/${ from }/${ to }`);
  }

  getCombinationsById(id: number): Observable<any> {
    return this.http.get(environment + 'v3/matriz/exibir/' + id);
  }

  createCombinations(body: Lotofacil): Observable<any> {
    return this.http.post(environment + 'v3/matriz/gerar', body);
  }

  deleteCombination(id: number): Observable<any> {
    return this.http.delete(environment + 'v3/matriz/remover/' + id);
  }

  getLotofacilInfo(): Observable<any> {
    return this.http.get('https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/');
  }
}
