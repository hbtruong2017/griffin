import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EthcontractService } from '../service/ethcontract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeId: any;
  timesheetId: any;
  employeeDetail: any;
  clockOutForm: FormGroup;
  duration: any;
  salaryRate: any;
  timeIn: any;
  employeeAccount: string = "0xC1a082E97f666Cbf9C31290aAf49C17c03Beed0c";
  employeeBalance: any;

  constructor(private dataService: DataService, private router: Router, private ethcontractService: EthcontractService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let currentTime = Date.now() as any;
    // this.employeeId = "5daee7026fb70b0f746dd37b";
    this.employeeId = window.sessionStorage.getItem("employeeId");
    this.timesheetId = window.sessionStorage.getItem("timesheetId");
    this.salaryRate = window.sessionStorage.getItem("salaryRate");
    this.timeIn = window.sessionStorage.getItem("timeIn");

    this.duration = 8;

    this.employeeId = "5daee7026fb70b0f746dd37b";
    this.dataService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
    })

    this.clockOutForm = this.formBuilder.group({
      description: ['', Validators.required]
    })

    this.employeeBalance = window.sessionStorage.getItem("employeeBalance")
  }

  clockOut() {
    let clockOutRequest = {
      description: this.clockOutForm.get("description").value
    }
    console.log(this.clockOutForm)
    this.dataService.clockOut(this.timesheetId, clockOutRequest).subscribe((data:any) => {
      console.log(data);
    })
    this.transferEther();

    this.ethcontractService.getEmployeeAccountInfo(this.employeeAccount).then((result:any) => {
      this.employeeBalance = result.balance.c[0] + "." + ("" + result.balance.c[1]).slice(0,2);
      window.sessionStorage.setItem("employeeBalance", this.employeeBalance )
    })
  }

  transferEther() {
    this.router.navigate(["/paymentsuccess"]);
    this.salaryRate = 0.1;
    let transferFrom = "0x48EcE0Ae91d0b77D41eE67AE71508DfF154FCc61"; // default
    let transferTo = "0xC1a082E97f666Cbf9C31290aAf49C17c03Beed0c";
    let amount = this.salaryRate * 8;
    let remarks = this.clockOutForm.get("description").value;

    this.ethcontractService.transferEther(transferFrom, transferTo, amount, remarks).then(function () {
      this.router.navigate("/paymentsuccess");
    }).catch(function (error) {
      console.log(error);
    });
  }
}
