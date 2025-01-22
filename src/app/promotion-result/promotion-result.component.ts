import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Utils } from '../utils/utils';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-promotion-result',
  templateUrl: './promotion-result.component.html',
  styleUrls: ['./promotion-result.component.scss']
})
export class PromotionResultComponent implements OnInit {
  promotions: any[] = [];


  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions(): void {
    this.appService.findAllPromotions('MS').subscribe({
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

  downloadRegulation(): void {
    this.appService.downloadRegulation('MS').subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Regulamento');
      },
      error: (error) => {
        this.notificationService.notify('Ocorreu um erro ao baixar o regulamento');
      }
    })
  }
}
