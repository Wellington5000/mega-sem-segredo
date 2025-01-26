import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.scss']
})
export class SimulateComponent {
  combinationsQuantity: number = 0;
  selectedNumbers: Set<number> = new Set();
  maxSelectableNumbers: number = 15;
  numbers: string[] = Array.from({ length: 25 }, (_, i) => String(i + 1).padStart(2, '0'));
  from: FormControl = new FormControl(1, Validators.required);
  to: FormControl = new FormControl(3000, Validators.required);

  constructor(
    private router: Router
  ) { }

  addOrRemoveNumber(number: number): void {
    if (this.checkNumber(number)) {
      this.selectedNumbers.delete(number);
    } else {
      if (this.selectedNumbers.size < this.maxSelectableNumbers) {
        this.selectedNumbers.add(number);
      }
    }
  }

  checkNumber(number: number): boolean {
    return this.selectedNumbers.has(number);
  }

  clear(): void {
    this.selectedNumbers.clear();
  }

  createSimulation(): void {
    this.router.navigateByUrl('/lotofacil-simulate-result');
  }
}
