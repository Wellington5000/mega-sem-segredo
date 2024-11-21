import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() img: string = '';
  @Input() type: string = 'png';
  @Input() width: string = '500px'
  @Input() height: string = '500px';

  src: string = '';

  ngOnInit(): void {
    this.src = `/assets/img/${this.img}.${this.type}`;
  }
}
