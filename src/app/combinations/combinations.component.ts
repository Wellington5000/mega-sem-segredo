import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LotteryService } from '../services/lottery.service';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-combinations',
  templateUrl: './combinations.component.html',
  styleUrls: ['./combinations.component.scss']
})
export class CombinationsComponent implements OnInit {
  id!: number;
  sortedCombinations: any[] = [];
  dozens: number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private LotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCombinations(this.id);
  }

  getCombinations(id: number): void {
    this.LotteryService.getCombinationsById(id).subscribe({
      next: (response) => {
        const combinations: any[] = response?.combinacoes;
        this.dozens = response?.dezenas;
        this.sortedCombinations = combinations.map(arr => arr.sort((a: number, b: number) => a - b))
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }
}
