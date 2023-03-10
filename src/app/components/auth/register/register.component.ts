import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../api/services/auth";
import {User} from "../../../api/models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  isShowing: boolean = true
  form : FormGroup

  constructor(private auth: AuthService) {
    this.form = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      secondName: new FormControl(null,[Validators.required]),
      Email: new FormControl(null,[Validators.required,Validators.email]),
      Password: new FormControl(null,[Validators.required,Validators.minLength(6)]),
      phone:new FormControl(null,[Validators.required]),
      Admin:new FormControl(null)
    })
  }
  ngOnInit(): void {
  }
  onSubmit(){
    if(this.form.invalid){
      return
    }
    const user:User ={
      Id:0,
      Name : this.form.value.name,
      SecondName:this.form.value.secondName,
      Email:this.form.value.Email,
      Password:this.form.value.Password,
      Phone:this.form.value.phone,
      Admin:this.form.value.Admin
    }
    this.auth
      .register(user)
      .subscribe()
  }
  close() {
    this.isShowing = false
  }
}
