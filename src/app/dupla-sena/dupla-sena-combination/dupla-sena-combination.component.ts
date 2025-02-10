import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lotofacil } from 'src/app/models/lotofacil';
import { LotteryService } from 'src/app/services/lottery.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';

@Component({
  selector: 'app-dupla-sena-combination',
  templateUrl: './dupla-sena-combination.component.html',
  styleUrls: ['./dupla-sena-combination.component.scss']
})
export class DuplaSenaCombinationComponent implements OnInit {
combinationsQuantity: number = 0;
  selectedNumbers: Set<number> = new Set();
  maxSelectableNumbers: number = 18;
  numbers: string[] = Array.from({ length: 50 }, (_, i) => String(i + 1).padStart(2, '0'));

  private combinationMapping: Record<number, { quantity: number; maxSelectable: number }> = {
    1: { quantity: 14, maxSelectable: 10 },
    2: { quantity: 142, maxSelectable: 10 },
    3: { quantity: 850, maxSelectable: 10 }
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
      loteria: 'DS'
    };
  }

  createCombinations(): void {
    this.lotteryService.createCombinations(this.getBodyLotofacil()).subscribe({
      next: (response) => {
        this.notificationService.success('Combinações geradas com sucesso!');
        this.router.navigateByUrl('/lottery/dupla-sena');
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.erro || 'Ocorreu um erro ao gerar as combinações!');
      }
    });
  }

  clearCombination(): void {
    this.selectedNumbers.clear();
  }
}
