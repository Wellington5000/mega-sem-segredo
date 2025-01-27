import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LotteryService } from '../../services/lottery.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';

@Component({
  selector: 'app-simulate-result',
  templateUrl: './simulate-result.component.html',
  styleUrls: ['./simulate-result.component.scss']
})
export class SimulateResultComponent implements OnInit {
  id!: number;
  selectedNumbers: number[] = [];
  sortedCombinations: any[] = [];
  combinations: number[][] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private LotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSelectedNumbers();
  }

  getCombinations(id: number): void {
    this.LotteryService.getCombinationsById(id).subscribe({
      next: (response) => {
        this.combinations = response?.combinacoes;
        this.sortedCombinations = this.combinations.map(arr => arr.sort((a: number, b: number) => a - b))
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }

  getSelectedNumbers(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.selectedNumbers = params['numbers'] ? JSON.parse(params['numbers']) : [];
      this.getCombinations(this.id);
    });
  }

  countMatchingNumbers(arr1: number[], arr2: number[]): number {
    const set1 = new Set(arr1);
    return arr2.filter(num => set1.has(num)).length;
  }

  countMatchingArrays(matrix: number[][], selectedNumbers: number[], minMatches: number): number {
    return matrix.filter(arr => {
      const commonNumbers = arr.filter(num => selectedNumbers.includes(num)).length;
      return commonNumbers >= minMatches;
    }).length;
  }
  
}
