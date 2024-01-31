import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  buttonText: string = 'Baixar o APP';
  link: string = 'https://play.google.com/store/apps/details?id=br.com.lotobets';
  subtitle: string = 'Agora é so baixar o nosso app e logar que é sucesso!';

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const origin = this.activatedRoute.snapshot.params['origin'];
    if(origin === 'app') {
      this.link = 'megasemsegredo://';
      this.buttonText = 'Entrar no APP';
      this.subtitle = 'Agora é só logar que é sucesso!';
    }
  }

}
