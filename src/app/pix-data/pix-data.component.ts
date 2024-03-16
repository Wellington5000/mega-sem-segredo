import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pix-data',
  templateUrl: './pix-data.component.html',
  styleUrls: ['./pix-data.component.scss']
})
export class PixDataComponent implements OnInit {
  hasError: boolean = false;
  @Output() nextStep = new EventEmitter();

  formPix: FormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

  next(): void {
    if(this.formPix.valid) {
      this.nextStep.emit({ document_number: this.formPix.value, document_type: 'CPF', valor: 180 });
    } else {
      this.hasError = true;
    }
  }
}
