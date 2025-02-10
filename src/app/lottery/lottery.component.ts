import { Component, HostListener, OnInit } from '@angular/core';
import { LotteryService } from '../services/lottery.service';
import { Combination } from '../models/combinations';
import { NotificationService } from '../utils/notification/notification.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit {
  combinations: Combination[] = [];
  hasCombination: boolean = false;
  showPromotionSubMenuId: number | null = null;

  constructor(
    private lotteryService: LotteryService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getCombinations();
  }

  getCombinations(): void {
    this.lotteryService.getCombinations('LF').subscribe({
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
    });
  }

  sendEmail(id: number): void {
    this.lotteryService.sendEmail(id).subscribe({
      next: (response) => {
        this.notificationService.success('Volantes enviados com sucesso!');
        this.getCombinations();
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.erro || 'Ocorreu um erro ao enviar os volantes!');
      }
    });
  }

  downloadCombinations(id: number): void {
     this.lotteryService.downloadCombinations(id).subscribe({
      next: (responde: Blob) => {
        const fileName = `Combinações${id}`;
        Utils.downloadPdf(responde, fileName);
      },
      error: (error) => {
        this.notificationService.notify('Erro ao baixar combinações');
      }
    });
  }

  togglePromotionSubMenu(event: Event, combinationId: number) {
    event.stopPropagation();
    this.showPromotionSubMenuId = this.showPromotionSubMenuId === combinationId ? null : combinationId;
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.showPromotionSubMenuId) {
      this.showPromotionSubMenuId = null;
    }
  }
}
