import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(    private authService: AuthService,
    private fb: FormBuilder) {
      this.loginForm = fb.group({
        email: '',
        password: ''
      });
     }

  ngOnInit() {

  }
  login() {
    const loginModel = this.loginForm.value;
    this.authService .login(loginModel.email, loginModel.password)
    .then(() => {
      console.log('Logged In');
    })
    .catch(error => {console.log(error);   });
  console.log(
    'LOGIN:   ' + loginModel.email + ' / ' + loginModel.password + '    '
  );
}

}
