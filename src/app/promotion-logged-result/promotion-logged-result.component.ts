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
  hasPlan: boolean = false;

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getSignature();
  }

  getPromotions(): void {
    this.appService.findAllPromotions().subscribe({
      next: (response) => {
        this.promotions = response;
      },
      error: (error) => {
        this.notificationService.notify('Erro ao carregar promoções');
      }
    });
  }

  downloadProofPayments(id: string): void {
    this.appService.downloadProofPayments(id).subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Comprovante de pagamentos');
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
    }
  }
}