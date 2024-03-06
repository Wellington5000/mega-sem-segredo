import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { Utils } from '../utils/utils';

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
    this.isLoading = true;
    this.appService.findAllPromotions().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.promotions = response;
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.notify('Erro ao carregar promoções');
      }
    });
  }

  getPromotion(): void {
    if(this.code.value) {
      this.isLoading = true;
      this.appService.findPromotionByCode(this.code.value).subscribe({
        next: (response) => {
          this.searchCode = true;
          this.isLoading = false;
          this.promotionsByCode = response?.premiados;
        },
        error: (error) => {
          this.isLoading = false;
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
      this.appService.downloadReportOrReceipt(promotion?.grupo_id, type).subscribe({
        next: (response: Blob) => {
          this.isLoading = false;
          const fileName = `${type}_${promotion?.grupo_id}`
          Utils.downloadPdf(response, fileName);
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
