import { Component, OnInit } from '@angular/core';
import { Utils } from '../utils/utils';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
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
}
