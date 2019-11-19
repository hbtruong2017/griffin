import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    window.sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    })
  }

  goToHome() {
    window.sessionStorage.setItem("email", this.loginForm.get("email").value)
    window.sessionStorage.setItem("startWork", "false")
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })
  }

}
