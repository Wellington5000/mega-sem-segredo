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
  to!: number;
  from!: number;
  simulationType!: string;
  selectedNumbers: number[] = [];
  sortedCombinations: any[] = [];
  combinations: number[][] = [];
  concourses: number[][] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private LotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.checkSimulationType();
  }

  checkSimulationType(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      const number = params['numbers'];

      if(number) {
        this.simulationType = 'selection';
        this.selectedNumbers = params['numbers'] ? JSON.parse(params['numbers']) : [];
        this.getCombinationsBySelection(this.id);
      } else {
        this.simulationType = 'concourse';
        this.from = params['from'];
        this.to = params['to'];
        this.getCombinationsByConcourses(this.id, this.from, this.to);
      }
    });
  }

  getCombinationsBySelection(id: number): void {
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

  getCombinationsByConcourses(id: number, from: number, to: number): void {
    this.LotteryService.getCombinationsByConcourses('LF', from, to).subscribe({
      next: (response) => {
        this.concourses = response?.concursos;
        this.getCombinationsBySelection(id);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    })
  }

  countMatchingNumbers(arr1: number[], arr2: number[]): number {
    const set1 = new Set(arr1);
    return arr2.filter(num => set1.has(num)).length;
  }

  countMatchingArrays(matrix: number[][], selectedNumbers: number[], numMatches: number): number {
    return matrix.filter(arr => {
      const commonNumbers = arr.filter(num => selectedNumbers.includes(num)).length;
      return commonNumbers === numMatches;
    }).length;
  }
  
}
