import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lucky-pix',
  templateUrl: './lucky-pix.component.html',
  styleUrls: ['./lucky-pix.component.scss']
})
export class LuckyPixComponent implements OnInit {
  hasError: boolean = false;
  searchCode: boolean = false;

  code: FormControl = new FormControl('', Validators.required);

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.code.valueChanges.subscribe((value) => {
      this.code.setValue(value.toUpperCase(), { emitEvent: false });
    })
  }

  searchByCode(): void {
    if(this.code.valid) {
      this.searchCode = true;
    } else {
      this.hasError = true;
    }
  }  
}
