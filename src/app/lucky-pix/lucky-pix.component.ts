import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-lucky-pix',
  templateUrl: './lucky-pix.component.html',
  styleUrls: ['./lucky-pix.component.scss']
})
export class LuckyPixComponent implements OnInit {
  promotions: any[] = [];
  hasError: boolean = false;
  isLoading: boolean = false;
  searchCode: boolean = false;
  promotionsByCode: any[] = [];

  code: FormControl = new FormControl('', Validators.required);

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getPromotions();
  }

  ngAfterViewInit(): void {
    this.code.valueChanges.subscribe((value) => {
      this.code.setValue(value.toUpperCase(), { emitEvent: false });
    })
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

  getPromotion(): void {
    if(this.code.value) {
      this.appService.findPromotionByCode(this.code.value).subscribe({
        next: (response) => {
          this.searchCode = true;
          this.promotionsByCode = response?.premiados;
        },
        error: (error) => {
          this.notificationService.notify('Erro ao carregar promoção');
        }
      })
    } else {
      this.searchCode = false;
      this.getPromotions();
    }
  }

  downloadPdf(promotion: any, type: string): void {
    if((type === 'relatorio' && promotion?.tem_relatorio === "S") || (type === 'comprovante' && promotion?.tem_comprovante === "S")) {
      this.isLoading = true;
      this.appService.downloadReceipt(promotion?.grupo_id, type).subscribe({
        next: (data: Blob) => {
          this.isLoading = false;
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
    
          const a = document.createElement('a');
          a.href = url;
          a.download = `${type}_${promotion?.grupo_id}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          this.notificationService.notify('Ocorreu um erro ao baixar o pdf');
          this.isLoading = false;
        }
      });
    } else {
      const t = type === 'relatorio' ? 'relatório' : 'comprovante';
      this.notificationService.notify(`Sem ${t} anexado`);
    }
  }
}
