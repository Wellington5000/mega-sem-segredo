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
  id!: number;
  to!: number;
  from!: number;
  simulationType!: string;
  selectedNumbers: number[] = [];
  sortedCombinations: number[][] = [];
  combinations: number[][] = [];
  concourses: number[][] = [];

  matchCounts: { [key: number]: number } = {};
  concourseMatchCounts: { [key: number]: { [key: number]: number } } = {};
  totalMatches: { [key: number]: number } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private lotteryService: LotteryService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.checkSimulationType();
  }

  checkSimulationType(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      const number = params['numbers'];

      if (number) {
        this.simulationType = 'selection';
        this.selectedNumbers = JSON.parse(params['numbers'] || '[]');
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
    this.lotteryService.getCombinationsById(id).subscribe({
      next: (response) => {
        this.combinations = response?.combinacoes || [];
        this.sortedCombinations = this.combinations.map(arr => [...arr].sort((a, b) => a - b));
        this.precomputeMatchCounts();
        this.totalMatches = this.calculateTotalMatches(this.concourseMatchCounts);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    });
  }

  getCombinationsByConcourses(id: number, from: number, to: number): void {
    this.lotteryService.getCombinationsByConcourses('LF', from, to).subscribe({
      next: (response) => {
        this.concourses = response?.concursos || [];
        this.getCombinationsBySelection(id);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    });
  }

  private precomputeMatchCounts(): void {
    this.matchCounts = {}; // Reinicializar para evitar lixo de execuções anteriores
  
    for (let i = 11; i <= 15; i++) {
      this.matchCounts[i] = this.countMatchingArrays(this.combinations, this.selectedNumbers, i);
    }
    
    this.concourses.forEach((concourse, index) => {
      this.concourseMatchCounts[index] = {};
      for (let i = 11; i <= 15; i++) {
        const count = this.countMatchingArrays(this.sortedCombinations, concourse, i);
        this.concourseMatchCounts[index][i] = count;  
      }
    });  
  }
  
  countMatchingNumbers(arr1: number[], arr2: number[]): number {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(num => set2.has(num)).length; // Conta corretamente os números em comum
  }
  
  countMatchingArrays(matrix: number[][], selectedNumbers: number[], numMatches: number): number {
    return matrix.reduce((acc, arr) => {
      const matchCount = this.countMatchingNumbers(arr, selectedNumbers);
      return acc + (matchCount === numMatches ? 1 : 0);
    }, 0);
  }
  

  trackByIndex(index: number): number {
    return index;
  }

  calculateTotalMatches(dados: any): { [key: string]: number } {
    const somaPorChave: { [key: string]: number } = {};

    for (const chave in dados) {
      if (dados.hasOwnProperty(chave)) {
        const subObjeto = dados[chave];
        for (const subChave in subObjeto) {
          if (subObjeto.hasOwnProperty(subChave)) {
            if (!somaPorChave[subChave]) {
              somaPorChave[subChave] = 0;
            }
            somaPorChave[subChave] += subObjeto[subChave];
          }
        }
      }
    }

    return somaPorChave;
  }
  
  hasMatches(i: number): boolean {
    return [11, 12, 13, 14, 15].some(j => this.concourseMatchCounts[i][j] > 0);
  }
}
