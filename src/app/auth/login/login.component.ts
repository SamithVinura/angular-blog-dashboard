import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService){}
  ngOnInit():void{}

  onSubmit(loginForm:any){
    this.auth.login(loginForm.email,loginForm.password)
  }
}
