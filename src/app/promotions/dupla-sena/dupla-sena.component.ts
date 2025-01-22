import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Signature } from 'src/app/models/signature';
import { NotificationService } from 'src/app/utils/notification/notification.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-dupla-sena',
  templateUrl: './dupla-sena.component.html',
  styleUrls: ['./dupla-sena.component.scss']
})
export class DuplaSenaComponent {
  isProUser: boolean = false;
  promotions: any[] = [];

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getPromotions(): void {
    this.appService.findAllPromotions('DS').subscribe({
      next: (response) => {
        this.promotions = response?.participacoes;
      },
      error: (error) => {
        this.notificationService.notify('Erro ao carregar promoções');
      }
    });
  }

  getUser(): void {
    const user = Utils.getUser();

    if(Object.keys(user).length > 0) {
      this.getSignature();
    }
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
      this.isProUser = true;
      this.getPromotions();
    }
  }

  downloadRegulation(): void {
    this.appService.downloadRegulation('DS').subscribe({
      next: (response: Blob) => {
        this.downloadPdf(response, 'Regulamento');
      },
      error: (error) => {
        this.notificationService.notify('Ocorreu um erro ao baixar o regulamento');
      }
    })
  }

  downloadPdf(file: Blob, fileName: string): void {
    Utils.downloadPdf(file, fileName);
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
}
