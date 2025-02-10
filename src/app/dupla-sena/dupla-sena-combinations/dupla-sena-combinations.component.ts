import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LotteryService } from 'src/app/services/lottery.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';

@Component({
  selector: 'app-dupla-sena-combinations',
  templateUrl: './dupla-sena-combinations.component.html',
  styleUrls: ['./dupla-sena-combinations.component.scss']
})
export class DuplaSenaCombinationsComponent implements OnInit {
  id!: number;
  sortedCombinations: any[] = [];

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
        this.sortedCombinations = combinations.map(arr => arr.sort((a: number, b: number) => a - b))
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }
}
