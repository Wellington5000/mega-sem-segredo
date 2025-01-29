import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SimulateParams } from 'src/app/models/simulate-params';
import { CombinationService } from 'src/app/services/combination.service';

@Component({
  selector: 'app-simulate',
  templateUrl: './simulate.component.html',
  styleUrls: ['./simulate.component.scss']
})
export class SimulateComponent implements OnInit {
  id!: number;
  combinationsQuantity: number = 0;
  selectedNumbers: Set<number> = new Set();
  maxSelectableNumbers: number = 15;
  numbers: string[] = Array.from({ length: 25 }, (_, i) => String(i + 1).padStart(2, '0'));
  from: FormControl = new FormControl(1, Validators.required);
  to: FormControl = new FormControl(3000, Validators.required);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  addOrRemoveNumber(number: number): void {
    this.id = this.activatedRoute.snapshot.params['id'];

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

  createSimulationBySelection(): void {
    this.redirectToSimulation({ 
      id: this.id, 
      numbers: JSON.stringify(Array.from(this.selectedNumbers)) 
    });
  }

  createSimulationByConcourse(): void {
    this.redirectToSimulation({ 
      id: this.id, 
      from: this.from.value,
      to: this.to.value,
    });
  }
  
  redirectToSimulation(params: SimulateParams): void {
    this.router.navigate(['/lotofacil-simulate-result'], {
      queryParams: params
    });
  }
}
