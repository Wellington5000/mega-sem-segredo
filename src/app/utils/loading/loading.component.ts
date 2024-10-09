import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/spinner.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {  
  @Input() isLoading: boolean = false;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.listenSpinner();
  }

  listenSpinner(): void {
    this.spinnerService.spinner$.subscribe((value) => {
      this.isLoading = value;
    })
  }
}
