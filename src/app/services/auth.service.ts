import { Injectable } from '@angular/core';
/* import { Auth, signInAnonymously } from '@angular/fire/auth'; */
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false)

  constructor(public auth:AngularFireAuth, private toaster:ToastrService,private router:Router) {  }

  login(email:any,password:any){
    this.auth.signInWithEmailAndPassword(email,password).then(
      logRef=>{
        this.toaster.success('Logged In Successfully')
        this.router.navigate(['/'])
        this.loadUser()
        this.loggedIn.next(true)
      }
    ).catch(e=>{
      this.toaster.warning("Email or Password Incorrect")
    })
  }

  loadUser(){
    this.auth.authState.subscribe(user=>{
      localStorage.setItem('user',JSON.stringify(user))
    })
  }

  logOut(){
    this.auth.signOut().then(()=>{
      this.toaster.success('User Logged Out')
      localStorage.removeItem('user')
      this.router.navigate(['/login'])
      this.loggedIn.next(false)
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable()
  }
}
