import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {
  showLogin: boolean = false;
  loginForm: FormGroup;
  otpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      pin: ['', Validators.required]
    })

    this.otpForm = this.formBuilder.group({
      otp1: ['', Validators.required],
      otp2: ['', Validators.required],
      otp3: ['', Validators.required],
      otp4: ['', Validators.required],
      otp5: ['', Validators.required],
      otp6: ['', Validators.required]
    })

    $('.form-group').each((i, e) => {
      $('.form-control', e)
        .focus(function () {
          e.classList.add('not-empty');
        })
        .blur(function () {
          this.value === '' ? e.classList.remove('not-empty') : null;
        })
        ;
    });

    if (this.showLogin) {
      $('#login').modal('hide'); // hides modal with id viewUser 
      $('#generateOTP').modal('show'); // display modal with id editUser
    }

    let $inputs = $("#generateOTP").find("input");
    $inputs.on('keyup', processInput);

    function processInput(e) {
      var x = e.charCode || e.keyCode;
      if ((x == 8 || x == 46) && this.value.length == 0) {
        var indexNum = $inputs.index(this);
        if (indexNum != 0) {
          $inputs.eq($inputs.index(this) - 1).focus();
        }
      }

      if (ignoreChar(e))
        return false;
      else if (this.value.length == this.maxLength) {
        $(this).next('input').focus();
      }
    }
    function ignoreChar(e) {
      var x = e.charCode || e.keyCode;
      if (x == 37 || x == 38 || x == 39 || x == 40)
        return true;
      else
        return false
    }
  }

  requestOTP() {
    let headerObj = {
      Header: {
        serviceName: "requestOTP",
        userID: this.loginForm.get("username").value,
        PIN: this.loginForm.get("pin").value,
        OTP: ""
      }
    }
    let header = JSON.stringify(headerObj);
    this.dataService.requestOTP(header).subscribe((data: any) => {
      console.log(data)
      if (data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails == "success") {
        console.log("Successfully retrieve OTP")
      }
    })
  }

  login() {
    let otp = "" + this.otpForm.get("otp1").value +  this.otpForm.get('otp2').value +  this.otpForm.get('otp3').value +
    this.otpForm.get('otp4').value +  this.otpForm.get('otp5').value +  this.otpForm.get('otp6').value;
    let headerObj = {
      Header: {
        serviceName: "loginCustomer",
        userID: this.loginForm.get("username").value,
        PIN: this.loginForm.get("pin").value,
        OTP: otp
      }
    }
    let header = JSON.stringify(headerObj);
    this.dataService.loginCustomer(header).subscribe((data: any) => {
      if (data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID == "010000") {
        window.sessionStorage.setItem("userID", this.loginForm.get("username").value)
        window.sessionStorage.setItem("PIN", this.loginForm.get("pin").value)
        this.getCustomerDetails();
        this.router.navigate(["/home"])
      } else {
        console.log("Error")
      }      
    })
  }

  getCustomerDetails() {
    let headerObj = {
      Header: {
        serviceName: "getCustomerDetails",
        userID: this.loginForm.get("username").value,
        PIN: this.loginForm.get("pin").value,
        OTP: "999999"
      }
    }
    let header = JSON.stringify(headerObj);

    this.dataService.getCustomerDetails(header).subscribe((data: any) => {
      console.log(data);
      if (data.Content.ServiceResponse.ServiceRespHeader.GlobalErrorID == "010000") {
        window.sessionStorage.setItem("customerDetails", JSON.stringify(data.Content.ServiceResponse.CDMCustomer))
      } else {
        console.log("Error")
      }
    })
  }
}
