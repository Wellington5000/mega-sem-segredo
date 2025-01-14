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
  numbers: string[] = Array.from({ length: 25 }, (_, i) => String(i + 1).padStart(2, '0'));

  private combinationMapping: Record<number, number> = {
    1: 24,
    2: 110,
    3: 356
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

  getBodyLotofacil(): Lotofacil {
    const selectedNumbersArray: number[] = [...this.selectedNumbers];

    return {
      dezenas: selectedNumbersArray,
      tipo: this.combinationsQuantity,
      loteria: 'LF'
    }
  }

  createCombinations(): void {
    this.lotteryService.createCombinations(this.getBodyLotofacil()).subscribe({
      next: (response) => {
        this.notificationService.success('Combinações geradas com sucesso!');
        this.router.navigateByUrl('/lottery/lotofacil')
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.erro || 'Ocorreu um erro ao gerar as combinações!');
      }
    })
  }
}
