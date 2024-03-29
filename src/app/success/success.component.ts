import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  @Input() isPixPayment: boolean = false;
  @Input() coupon: string = '';
  
  isCopied: boolean = false;
  successRoute: boolean = false;
  buttonText: string = 'Baixar o APP';
  subtitle: string = 'Agora é só baixar o nosso app e logar que é sucesso!';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.checkOrigin();
    this.checkRoute();
  }

  checkOrigin(): void {
    const origin = this.activatedRoute.snapshot.params['origin'];
    if(origin === 'app') {
      this.buttonText = 'Entrar no APP';
      this.subtitle = 'Agora é só logar que é sucesso!';
    }
  }

  checkRoute(): void {
    if(this.router.url.includes('success-register')) {
      this.successRoute = true;
    }
  }

  onCopied(isCopied: boolean) {
    this.isCopied = isCopied;
  }
}
