import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LotteryService } from 'src/app/services/lottery.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';

@Component({
  selector: 'app-dupla-sena-simulate-result',
  templateUrl: './dupla-sena-simulate-result.component.html',
  styleUrls: ['./dupla-sena-simulate-result.component.scss']
})
export class DuplaSenaSimulateResultComponent {
id!: number;
  to!: number;
  from!: number;
  simulationType!: string;
  selectedNumbers: number[] = [];
  sortedCombinations: number[][] = [];
  combinations: number[][] = [];
  concourses: number[][] = [];

  concourseMatchCountsFirstDraw: { [key: number]: { [key: number]: number } } = {};
  concourseMatchCountsSecondDraw: { [key: number]: { [key: number]: number } } = {};
  totalMatchesFirstDraw: { [key: number]: number } = {};
  totalMatchesSecondDraw: { [key: number]: number } = {};
  frequencyText: string = '';
  dozens: number[] = [];
  matchCounts: { [key: number]: number } = {};


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
        this.totalMatchesFirstDraw = this.calculateTotalMatches(this.concourseMatchCountsFirstDraw);
        this.totalMatchesSecondDraw = this.calculateTotalMatches(this.concourseMatchCountsSecondDraw);
        this.dozens = response?.dezenas;
        this.calculateSelectionMatches();
        this.frequencyText = this.calculatePrizeFrequency();
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    });
  }

  getCombinationsByConcourses(id: number, from: number, to: number): void {
    this.lotteryService.getCombinationsByConcourses('DS', from, to).subscribe({
      next: (response) => {
        this.concourses = response?.concursos || [];
        this.getCombinationsBySelection(id);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message || 'Ocorreu um erro ao listar as combinações!');
      }
    });
  }

  calculateSelectionMatches(): void {
    this.matchCounts = {};
    for (let i = 3; i <= 6; i++) {
      this.matchCounts[i] = this.countMatchingArrays(this.sortedCombinations, this.selectedNumbers, i);
    }
  }

  precomputeMatchCounts(): void {
    this.concourses.forEach((concourse, index) => {
      this.concourseMatchCountsFirstDraw[index] = {};
      this.concourseMatchCountsSecondDraw[index] = {};

      const firstDraw = concourse.slice(1, 7).sort((a, b) => a - b);
      const secondDraw = concourse.slice(7, 13).sort((a, b) => a - b);

      for (let i = 3; i <= 6; i++) {
        this.concourseMatchCountsFirstDraw[index][i] = this.countMatchingArrays(this.sortedCombinations, firstDraw, i);
        this.concourseMatchCountsSecondDraw[index][i] = this.countMatchingArrays(this.sortedCombinations, secondDraw, i);
      }
    });
  }

  countMatchingNumbers(arr1: number[], arr2: number[]): number {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return [...set1].filter(num => set2.has(num)).length;
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
    const total: { [key: string]: number } = {};
    for (const key in dados) {
      for (const subKey in dados[key]) {
        total[subKey] = (total[subKey] || 0) + dados[key][subKey];
      }
    }
    return total;
  }

  hasMatches(i: number): boolean {
    return [3, 4, 5, 6].some(j =>
      (this.concourseMatchCountsFirstDraw[i]?.[j] || 0) > 0 ||
      (this.concourseMatchCountsSecondDraw[i]?.[j] || 0) > 0
    );
  }

  calculatePrizeFrequency(): string {
    const totalConcourses = this.concourses.length;
    if (totalConcourses === 0) return "Nenhum concurso analisado.";

    const prizeCount = this.concourses.filter((_, i) =>
      [3, 4, 5, 6].some(j => (this.concourseMatchCountsFirstDraw[i]?.[j] || 0) > 0 || (this.concourseMatchCountsSecondDraw[i]?.[j] || 0) > 0)
    ).length;

    if (prizeCount === 0) return "Nenhum concurso teve premiação.";

    const ratio = totalConcourses / prizeCount;
    return `Em média, 1 em cada ${ratio.toFixed(2)} concursos houve premiação.`;
  }

  getDescriptionName(number: number): string {
    if(number === 3) return 'Terno';
    if(number === 4) return 'Quadra';
    if(number === 5) return 'Quina';
    if(number === 6) return 'Sena';

    return '';
  }
}
