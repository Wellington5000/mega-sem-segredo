import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Utils } from '../utils/utils';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
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

  downloadPdf(file: Blob, fileName: string): void {
    Utils.downloadPdf(file, fileName);
  }
}
