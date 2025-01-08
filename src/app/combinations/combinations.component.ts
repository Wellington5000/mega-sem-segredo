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
  combinations: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private LotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getCombinations(id);
  }

  getCombinations(id: number): void {
    this.LotteryService.getCombinationsById(id).subscribe({
      next: (response) => {
        this.combinations = response?.combinacoes;
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }
}
