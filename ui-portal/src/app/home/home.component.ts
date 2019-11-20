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
  imgLink: string;
  timesheetId: any;
  employeeDetail: any;
  clockOutForm: FormGroup;
  duration: any;
  salaryRate: any;
  timeIn: any;
  employeeAccount: string;
  employeeBalance: any;
  startWork: boolean;

  constructor(private dataService: DataService, private router: Router, private ethcontractService: EthcontractService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let email = window.sessionStorage.getItem("email")
    let credentials = {
      "paul.griffin@nike.com": {
        employeeId: "5daee7026fb70b0f746dd37b",
        imgLink: "../../../assets/images/paulgriffin.png",
        employeeAccount: "0xC1a082E97f666Cbf9C31290aAf49C17c03Beed0c"
      },
      "rachess.tan@nike.com": {
        employeeId: "5dd3f0b2c1486b23fc18ec07",
        imgLink: "../../../assets/images/rachesstan.jpg",
        employeeAccount: "0x0f2d31cDf370c0c9825a7452e8d9586Ecf2A12Cf"
      }
    }

    this.employeeId = credentials[email].employeeId;
    this.imgLink = credentials[email].imgLink;
    this.employeeAccount = credentials[email].employeeAccount;

    this.startWork = JSON.parse(window.sessionStorage.getItem("startWork"))

    this.dataService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      this.salaryRate = data.data.salaryRate;

      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
      window.sessionStorage.setItem("employeeId", data.data._id)
      window.sessionStorage.setItem("salaryRate", data.data.salaryRate)

      this.ethcontractService.getEmployeeAccountInfo(this.employeeAccount).then((result: any) => {
        let digit = (result.balance.c[1] ? result.balance.c[1] + "" : "000000")
        this.employeeBalance = result.balance.c[0] + "." + digit.slice(0, 2);
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
    window.sessionStorage.setItem("startWork", "true")

    this.startWork = false;

    let clockInReq = {
      employeeId: this.employeeId,
      employeeName: this.employeeDetail.name
    }
    this.dataService.clockIn(clockInReq).subscribe((data: any) => {
      window.sessionStorage.setItem("timesheetId", data.id);
      window.sessionStorage.setItem("timeIn", data.data.timeIn);
      window.location.reload();
    })
  }

  clockOut() {
    let currentTime = Date.now() as any;
    this.startWork = false;
    window.sessionStorage.setItem("startWork", "false")

    this.duration = 8;

    let clockOutRequest = {
      description: this.clockOutForm.get("description").value
    }
    this.timesheetId = window.sessionStorage.getItem("timesheetId");
    this.timeIn = window.sessionStorage.getItem("timeIn");

    this.dataService.clockOut(this.timesheetId, clockOutRequest).subscribe((data: any) => {
      console.log(data);
      this.transferEther();
      // this.router.navigate(['/paymentsuccess']).then(() => {
      //   window.location.reload();
      // })
    })

    // this.ethcontractService.getEmployeeAccountInfo(this.employeeAccount).then((result: any) => {
    //   this.employeeBalance = result.balance.c[0] + "." + ("" + result.balance.c[1]).slice(0, 2);
    //   window.sessionStorage.setItem("employeeBalance", this.employeeBalance)
    // })

  }

  transferEther() {
    this.salaryRate = 0.1;
    console.log("STart to transfer Ether")
    let transferFrom = "0x48EcE0Ae91d0b77D41eE67AE71508DfF154FCc61"; // default
    // let transferFrom = "0xB48EA375f2E418BF470ccD4693F6C387b895A874"
    let transferTo = this.employeeAccount;
    let amount = this.salaryRate * 8;
    let remarks = this.clockOutForm.get("description").value;

    this.ethcontractService.transferEther(transferFrom, transferTo, amount, remarks).then(function () {
      console.log("PAYMENT MADE")
    }).catch(function (error) {
      console.log(error);
    });
  }
}
