import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from "./core/auth/pages/login/login.component";
import { AlertComponent } from './shared/components/alert/alert.component';
interface City {
  name: string;
  code: string;
}

@Component({
  imports: [NxWelcomeComponent, LoginComponent, AlertComponent, FormsModule, ReactiveFormsModule, RouterModule, ButtonModule, InputGroupModule, InputGroupAddonModule, FloatLabelModule, InputTextModule, InputNumberModule, SelectModule, LoginComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  loginErrorMessage: string | null = null;
  private redirectURL: string | null = null ;
  value: string | undefined;


  loginForm: FormGroup;
  title = 'miyembro';
  text1: string | undefined;

    text2: string | undefined;

    number: string | undefined;

    selectedCity: City | undefined;

    cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
    ];

    constructor(
      
  
    ) {
      this.loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      });
    }


    onClickLogin() {
      // const loginFormVal = this.loginForm.value;
      // this.loginErrorMessage = null;
      // this.authenticationService.login(loginFormVal).subscribe(
      //   (res) => {
      //     console.log(res);
  
      //     this.sessionService.setSession(res.data);
      //     if (this.redirectURL) {
      //       this.router.navigateByUrl(this.redirectURL);
      //     } else {
      //       this.router.navigate(['/']);
      //     }
      //   },
      //   (err: ErrorResponse) => {
      //     console.log(err);
      //     this.loginErrorMessage = err.messsage;
      //   }
      // );
    }
}
