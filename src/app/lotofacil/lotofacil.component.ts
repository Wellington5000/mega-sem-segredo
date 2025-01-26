import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotteryService } from '../services/lottery.service';
import { Lotofacil } from '../models/lotofacil';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-lotofacil',
  templateUrl: './lotofacil.component.html',
  styleUrls: ['./lotofacil.component.scss']
})
export class LotofacilComponent implements OnInit {
  combinationsQuantity: number = 0;
  selectedNumbers: Set<number> = new Set();
  maxSelectableNumbers: number = 18;
  numbers: string[] = Array.from({ length: 25 }, (_, i) => String(i + 1).padStart(2, '0'));

  private combinationMapping: Record<number, { quantity: number; maxSelectable: number }> = {
    1: { quantity: 24, maxSelectable: 18 },
    2: { quantity: 110, maxSelectable: 19 },
    3: { quantity: 356, maxSelectable: 20 }
  };

  constructor(
    private router: Router,
    private lotteryService: LotteryService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const combinationParam = this.activatedRoute.snapshot.params['combination'];
    const combination = Number(combinationParam);

    if (isNaN(combination)) {
      console.warn('Invalid combination parameter:', combinationParam);
      this.combinationsQuantity = 0;
      this.maxSelectableNumbers = 18;
    } else {
      this.setCombinationsProperties(combination);
    }
  }

  setCombinationsProperties(combination: number): void {
    const mapping = this.combinationMapping[combination];
    
    if (mapping) {
      this.combinationsQuantity = mapping.quantity;
      this.maxSelectableNumbers = mapping.maxSelectable;
    } else {
      this.combinationsQuantity = 0;
      this.maxSelectableNumbers = 18;
    }
  }

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

  getBodyLotofacil(): Lotofacil {
    const selectedNumbersArray: number[] = [...this.selectedNumbers];

    return {
      dezenas: selectedNumbersArray,
      tipo: this.combinationsQuantity,
      loteria: 'LF'
    };
  }

  createCombinations(): void {
    this.lotteryService.createCombinations(this.getBodyLotofacil()).subscribe({
      next: (response) => {
        this.notificationService.success('Combinações geradas com sucesso!');
        this.router.navigateByUrl('/lottery/lotofacil');
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.erro || 'Ocorreu um erro ao gerar as combinações!');
      }
    });
  }
}
