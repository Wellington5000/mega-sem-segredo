import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pix-data',
  templateUrl: './pix-data.component.html',
  styleUrls: ['./pix-data.component.scss']
})
export class PixDataComponent implements OnInit {
  hasError: boolean = false;

  formPix: FormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit(): void {
  }

}
