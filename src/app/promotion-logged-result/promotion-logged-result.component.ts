import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { Utils } from '../utils/utils';
import { Signature } from '../models/signature';

@Component({
  selector: 'app-promotion-logged-result',
  templateUrl: './promotion-logged-result.component.html',
  styleUrls: ['./promotion-logged-result.component.scss']
})
export class PromotionLoggedResultComponent implements OnInit {
  promotions: any[] = [];
  isExpired: boolean = false;
  promotionMessage: string = 'Faça a assinatura agora mesmo e participe do Sorteio!';
  hasPlan: boolean = false;

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSignature();
    this.checkPromotionExpired();
  }

  getPromotions(): void {
    this.appService.findAllPromotions().subscribe({
      next: (response) => {
        this.promotions = response?.participacoes;
      },
      error: (error) => {
        this.notificationService.notify('Erro ao carregar promoções');
      }
    });
  }

  downloadProofCombinations(id: string): void {
    this.appService.downloadProofCombinations(id).subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Dezenas');
      },
      error: (error) => {
        this.notificationService.notify('Ocorreu um erro ao baixar as combinações');
      }
    })
  }

  downloadProofPayments(id: string): void {
    this.appService.downloadProofPayments(id).subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Comprovante de apostas');
      },
      error: (error) => {
        this.notificationService.notify('Ocorreu um erro ao baixar o comprovante');
      }
    })
  }

  downloadProofSuccess(id: string): void {
    this.appService.downloadProofSuccess(id).subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Comprovante de acertos');
      },
      error: (error) => {
        this.notificationService.notify('Ocorreu um erro ao baixar o comprovante');
      }
    })
  }

  downloadPdf(file: Blob, fileName: string): void {
    Utils.downloadPdf(file, fileName);
  }

  getSignature(): void {
    this.appService.getSignature().subscribe({
      next: (response) => {
        this.checkHasPlan(response);
      },
      error: (error) => {
        this.notificationService.notify(error?.error?.message); 
      }
    })
  }

  checkHasPlan(signature: Signature): void {
    const situation = signature?.situacao === 'ativa';

    if(situation && (signature?.plano?.codigo === 'pro')) {
      this.hasPlan = true;
      this.getPromotions();
    }
  }

  downloadRegulation(): void {
    this.appService.downloadRegulation().subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Regulamento');
      },
      error: (error) => {
        this.notificationService.notify('Ocorreu um erro ao baixar o regulamento');
      }
    })
  }

  checkPromotionExpired(): void {
    if(!this.checkDate()) {
      this.isExpired = true;
    }
  }

  checkDate(): boolean {
    const today = new Date(); 
    const targetDate = new Date('2024-12-28');
  
    return today < targetDate;
  }  
}
