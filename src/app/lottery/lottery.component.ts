import { Component, OnInit } from '@angular/core';
import { LotteryService } from '../services/lottery.service';
import { Combination } from '../models/combinations';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit {
  combinations: Combination[] = [];
  hasCombination: boolean = false;

  constructor(
    private lotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getCombinations();
  }

  getCombinations(): void {
    this.lotteryService.getCombinations().subscribe({
      next: (response) => {
        const combinacoes = response?.combinacoes || [];
        this.combinations = Object.values(combinacoes);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }

  deleteCombination(id: number): void {
    this.lotteryService.deleteCombination(id).subscribe({
      next: (response) => {
        this.notificationService.success('Combinações excluídas com sucesso!');
        this.getCombinations();
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.erro || 'Ocorreu um erro ao excluir as combinações!');
      }
    })
  }
}
