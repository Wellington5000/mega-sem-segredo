import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NotificationService } from '../utils/notification/notification.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit {
  selectedPaymentMethod: FormControl = new FormControl('credit_card');
  couponIsValid: boolean = false;
  hasError: boolean = false;
  coupon: FormControl = new FormControl('', Validators.minLength(4));

  @Output() nextStep = new EventEmitter();

  constructor(
    private appService: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.coupon.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      if(value?.length > 3) {
        this.checkCoupon();
      } else {
        this.couponIsValid = false;
      }
    })
  }

  checkCoupon(): void {
    this.appService.checkCouponIsValid(this.coupon.value).subscribe({
      next: (response) => {
        this.couponIsValid = response?.valido;
      },
      error: (error) => {
        this.notificationService.notify('Erro ao validar o código de indicação!');
      }
    })
  }

  next(): void {
    if(this.coupon.value.length === 0 || this.couponIsValid) {
      this.nextStep.emit({ payment_type: this.selectedPaymentMethod.value, coupon: this.coupon.value });
    } else {
      this.hasError = true;
    }
  }
}
