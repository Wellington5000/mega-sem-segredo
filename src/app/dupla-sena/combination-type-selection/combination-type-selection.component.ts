import { Component, HostListener, OnInit } from '@angular/core';
import { Combination } from 'src/app/models/combinations';
import { LotteryService } from 'src/app/services/lottery.service';
import { NotificationService } from 'src/app/utils/notification/notification.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-combination-type-selection',
  templateUrl: './combination-type-selection.component.html',
  styleUrls: ['./combination-type-selection.component.scss']
})
export class CombinationTypeSelectionComponent implements OnInit {
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
    this.lotteryService.getCombinations('DS').subscribe({
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
