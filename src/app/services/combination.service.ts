import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombinationService {
  private numberArraySource = new BehaviorSubject<number[]>([]);
  currentNumbers = this.numberArraySource.asObservable();

  setNumbers(numbers: number[]) {
    this.numberArraySource.next(numbers);
  }
}
