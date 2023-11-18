import { Component, Input, OnInit } from '@angular/core';

interface PixData {
  qrcode: string;
  qrcode_text: string;
}

@Component({
  selector: 'app-pix-payment',
  templateUrl: './pix-payment.component.html',
  styleUrls: ['./pix-payment.component.scss']
})
export class PixPaymentComponent implements OnInit {
  isCopy: boolean = false;
  @Input() data: PixData = { qrcode: 'https://qr.iugu.com/public/v1/qr_codes/image/0BA7928122F647BF829EE33AB970F69B', qrcode_text: '' };

  constructor() { }

  ngOnInit(): void {
  }

  copyText() {
    navigator.clipboard.writeText(this.data.qrcode_text).then(() => {
      this.isCopy = true;
      setTimeout(() => this.isCopy = false, 3000);
    }).catch(err => {
      this.isCopy = false;
    });
  }
}
