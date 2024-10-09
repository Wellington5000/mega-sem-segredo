import { Component, Input, OnInit } from '@angular/core';

interface PixData {
  copia_cola: string;
  img_qrcode: string;
  transaction_amount: number;
  pagamento: number;
  error: boolean;
  message: string;
}

@Component({
  selector: 'app-pix-payment',
  templateUrl: './pix-payment.component.html',
  styleUrls: ['./pix-payment.component.scss']
})
export class PixPaymentComponent implements OnInit {
  isCopy: boolean = false;
  @Input() data: PixData = {
    copia_cola: '',
    img_qrcode: '',
    transaction_amount: 0,
    pagamento: 0,
    error: false,
    message: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  copyText() {
    navigator.clipboard.writeText(this.data.copia_cola).then(() => {
      this.isCopy = true;
      setTimeout(() => this.isCopy = false, 3000);
    }).catch(err => {
      this.isCopy = false;
    });
  }
}
