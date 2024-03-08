import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Hits } from '../models/hits';
import { NotificationService } from '../utils/notification/notification.service';
import { FormControl } from '@angular/forms';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-check-hits',
  templateUrl: './check-hits.component.html',
  styleUrls: ['./check-hits.component.scss']
})
export class CheckHitsComponent implements OnInit {
  hits: Hits[] = [];
  isLoading: boolean = false;
  concourse: FormControl = new FormControl('');

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getHits();
  }

  getHits(): void {
    this.isLoading = true;
    this.appService.findAllHits().subscribe({
      next: (response) => {
        this.hits = response.concursos;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.notify('Erro ao carregar os concursos');
        this.isLoading = false;
      }
    })
  }

  getHitsByCode(): void {
    if(this.concourse.value) {
      this.isLoading = true;
      this.appService.findHitsByCode(this.concourse.value).subscribe({
        next: (response) => {
          this.hits = response.concursos;
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.notify('Concurso não encontrado');
          this.isLoading = false;
        }
      })
    } else {
      this.getHits();
    }
  }

  downloadConcourse(concourse: number): void {
    this.isLoading = true;
    this.appService.downloadConcourse(concourse).subscribe({
      next: (responde: Blob) => {
        this.isLoading = false;
        const fileName = `concurso_${concourse}`;
        Utils.downloadPdf(responde, fileName);
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.notify('Erro ao baixar relatório de acertos');
      }
    })
  }

  downloadPremiado(concourse: number): void {
    this.isLoading = true;
    this.appService.downloadPremiado(concourse).subscribe({
      next: (responde: Blob) => {
        this.isLoading = false;
        const fileName = `grupo_com_sena_${concourse}`;
        Utils.downloadPdf(responde, fileName);
      },
      error: (error) => {
        this.notificationService.notify('Erro ao baixar relatório de acertos');
      }
    })
  }
}
