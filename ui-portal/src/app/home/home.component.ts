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
  startWork: boolean = false;

  constructor(private dataService: DataService, private router: Router, private ethcontractService: EthcontractService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.employeeId = "5daee7026fb70b0f746dd37b";
    this.employeeId = "5daee7026fb70b0f746dd37b";
    this.dataService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      this.salaryRate = data.data.salaryRate;

      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
      window.sessionStorage.setItem("employeeId", data.data._id)
      window.sessionStorage.setItem("salaryRate", data.data.salaryRate)

      this.ethcontractService.getEmployeeAccountInfo(this.employeeAccount).then((result: any) => {
        this.employeeBalance = result.balance.c[0] + "." + ("" + result.balance.c[1]).slice(0, 2);
        window.sessionStorage.setItem("employeeBalance", this.employeeBalance)
      })
    })

    this.clockOutForm = this.formBuilder.group({
      description: ['', Validators.required]
    })

    this.employeeBalance = window.sessionStorage.getItem("employeeBalance")
  }

  clockIn() {
    this.startWork = true;

    let clockInReq = {
      employeeId: this.employeeId,
      employeeName: this.employeeDetail.name
    }
    this.dataService.clockIn(clockInReq).subscribe((data: any) => {
      window.sessionStorage.setItem("timesheetId", data.id);
      window.sessionStorage.setItem("timeIn", data.data.timeIn);
    })
  }

  clockOut() {
    let currentTime = Date.now() as any;

    this.duration = 8;
    
    let clockOutRequest = {
      description: this.clockOutForm.get("description").value
    }
    this.timesheetId = window.sessionStorage.getItem("timesheetId");
    this.timeIn = window.sessionStorage.getItem("timeIn");

    this.dataService.clockOut(this.timesheetId, clockOutRequest).subscribe((data: any) => {
      console.log(data);
    })
    this.transferEther();

    this.ethcontractService.getEmployeeAccountInfo(this.employeeAccount).then((result: any) => {
      this.employeeBalance = result.balance.c[0] + "." + ("" + result.balance.c[1]).slice(0, 2);
      window.sessionStorage.setItem("employeeBalance", this.employeeBalance)
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
      console.log("Payment success")
    }).catch(function (error) {
      console.log(error);
    });
  }

  refreshPage() {
    window.location.reload();
  }
}
