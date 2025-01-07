import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lotofacil',
  templateUrl: './lotofacil.component.html',
  styleUrls: ['./lotofacil.component.scss']
})
export class LotofacilComponent implements OnInit {
  combinationsQuantity: number = 0;
  selectedNumbers: Set<number> = new Set();
  numbers: string[] = Array.from({ length: 25 }, (_, i) => String(i + 1).padStart(2, '0'));

  private combinationMapping: Record<number, number> = {
    1: 24,
    2: 110,
    3: 356
  };

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const combinationParam = this.activatedRoute.snapshot.params['combination'];
    const combination = Number(combinationParam);

    if (isNaN(combination)) {
      console.warn('Invalid combination parameter:', combinationParam);
      this.combinationsQuantity = 0;
    } else {
      this.setCombinationsQuantity(combination);
    }
  }

  setCombinationsQuantity(combination: number): void {
    this.combinationsQuantity = this.combinationMapping[combination] || 0;
  }

  addOrRemoveNumber(number: number): void {
    if (this.checkNumber(number)) {
        this.selectedNumbers.delete(number);
    } else {
      if(this.selectedNumbers.size < 18) {
        this.selectedNumbers.add(number);
      }
    }
  }

  checkNumber(number: number): boolean {
    return this.selectedNumbers.has(number);
  }
}
