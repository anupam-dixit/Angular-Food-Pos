import { Component } from '@angular/core';
import {MyLib} from "../../../../Helpers/MyLib";
import {Endpoints} from "../../../../Helpers/Endpoints";
import {Router} from "@angular/router";
declare var Swal:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading_login: boolean=false;
  constructor(private router: Router) {}
  login(login_form: any) {
    MyLib.Loader.on()
    this.loading_login=true;
    let dataToSend={
      phone:login_form.phone.toString(),
      password:login_form.password,
    }
    const requestOptions = {
      method: 'POST', // GET/POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    };
    fetch(Endpoints.User.Login, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (!data.status){
          MyLib.Sound.play(0)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          MyLib.Loader.off()
          this.loading_login=false;
          return
        }
        localStorage.setItem('ls_u_data',JSON.stringify(data.data[0]))
        this.router.navigateByUrl('/panel/dashboard')
        this.loading_login=false;
        MyLib.Loader.off()
      });
  }
}
