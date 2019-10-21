import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-submit-loan',
  templateUrl: './submit-loan.component.html',
  styleUrls: ['./submit-loan.component.css']
})
export class SubmitLoanComponent implements OnInit {
  loanForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private dataService: DataService) { }

  ngOnInit() {
    var customerDetails = JSON.parse(window.sessionStorage.getItem("customerDetails"));

    this.loanForm = this.formBuilder.group({
      firstname: [customerDetails.givenName, Validators.required],
      lastname: [customerDetails.familyName, Validators.required], 
      jobtitle: [customerDetails.profile.occupation, Validators.required],
      company: ['', Validators.required],
      years: ['', Validators.required],
      phonenumber: [customerDetails.phone.localNumber, Validators.required],
      accountnumber: ['', Validators.required],
      description: ['', Validators.required],
      loancategory: ['', Validators.required],
      amount: ['', Validators.required],
      interest: ['', Validators.required],
      duration: ['', Validators.required],
      monthlyinstallment: ['', Validators.required],
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

    console.log(customerDetails)
    console.log(customerDetails.givenName)
    console.log(customerDetails.familyName)
    console.log(customerDetails.profile.occupation)
    console.log(customerDetails.phone.localNumber)
    // need to get the customer account number as well 

    // this.loanForm.patchValue({"firstname": customerDetails.givenName})
    // this.loanForm.setValue({"lastname": customerDetails.familyName})
    // this.loanForm.setValue({"jobtitle": customerDetails.profile.occupation})
    // this.loanForm.setValue({"phonenumber": customerDetails.phone.localNumber})
  }

  submitLoan() {
    
  }
}
