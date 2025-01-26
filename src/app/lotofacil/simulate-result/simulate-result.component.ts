import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LotteryService } from '../../services/lottery.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';

@Component({
  selector: 'app-simulate-result',
  templateUrl: './simulate-result.component.html',
  styleUrls: ['./simulate-result.component.scss']
})
export class SimulateResultComponent implements OnInit {
  sortedCombinations: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private LotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    
  }

  getCombinations(id: number): void {
    this.LotteryService.getCombinationsById(id).subscribe({
      next: (response) => {
        const combinations: any[] = response?.combinacoes;
        this.sortedCombinations = combinations.map(arr => arr.sort((a: number, b: number) => a - b))
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }
}
