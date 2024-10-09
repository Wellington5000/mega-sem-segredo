import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  user: any;

  formUser: FormGroup = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl()
  })

  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(user) {
      this.user = JSON.parse(user);
      this.setValues();
    }
  }

  setValues(): void {
    const name = this.user?.user?.name?.split(' ');
    const email = this.user?.user?.email;
    console.log(this.user)

    this.formUser.patchValue({
      first_name: name[0],
      last_name: name[1],
      email: email
    });

    this.formUser.disable();
  }

  logout(): void {
    this.appService.logout();
  }
}
