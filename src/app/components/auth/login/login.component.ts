import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../api/services/api";
import {Router} from "@angular/router";
import {AuthGuard} from "../../../api/services/guard";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isShowing:boolean = true
  form : FormGroup
  constructor(private auth: ApiService,
              private router:Router,
  ) {
    this.form = new FormGroup({
      Email: new FormControl(null,[Validators.required]),
      Password: new FormControl(null,[Validators.required]),
    })
  }


  onSubmit(){
    if(this.form.invalid){
      return
    }
    const val = this.form.value
    if(val.Email && val.Password){
      this.auth.login(val.Email, val.Password)
        .subscribe(
          (response) => {
            localStorage.setItem('AccessToken',response.AccessToken)
            this.router.navigateByUrl('/').then(AuthGuard.IsAdmin = response.admin)
          }
        );
    }
  }


  close(){
    this.isShowing = false
  }

}
