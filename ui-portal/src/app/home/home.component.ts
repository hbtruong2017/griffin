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
  duration: any = 8;
  salaryRate: any;
  timeIn: any;
  timeOut: any;
  employeeAccount: string;
  employeeBalance: any;
  startWork: boolean;
  inTimestamp: string;
  outTimestamp: string;
  standardWorkPaid: boolean;
  amountPaid: string;

  constructor(private dataService: DataService, private router: Router, private ethcontractService: EthcontractService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let email = window.sessionStorage.getItem("email")
    let credentials = {
      "paul.griffin@nike.com": {
        employeeId: "5daee7026fb70b0f746dd37b",
        imgLink: "../../../assets/images/paulgriffin.png",
        employeeAccount: "0xA65F1024FE110316a7f5Dc6e7ec8A0cE71F194Cc"
      },
      "rachess.tan@nike.com": {
        employeeId: "5dd3f0b2c1486b23fc18ec07",
        imgLink: "../../../assets/images/rachesstan.jpg",
        employeeAccount: "0x650378Fb43239C5624989d702562504DF04E8ABE"
        
      }
    }
    0x41AF416310349eac9727159F73807B2d23B2b34C
    this.employeeId = credentials[email].employeeId;
    this.imgLink = credentials[email].imgLink;
    this.employeeAccount = credentials[email].employeeAccount;

    this.startWork = JSON.parse(window.sessionStorage.getItem("startWork"))
    this.standardWorkPaid = JSON.parse(window.sessionStorage.getItem("standardWorkPaid"))
    this.amountPaid = window.sessionStorage.getItem("amountPaid")
    this.inTimestamp = window.sessionStorage.getItem("inTimestamp")
    this.outTimestamp = window.sessionStorage.getItem("outTimestamp")

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

    let timeIn: any = Date.now() / 1000;
    this.timeIn = timeIn;
    window.sessionStorage.setItem("timeIn", timeIn);
    let inTimestamp = this.getFormattedDate();
    this.inTimestamp = this.getFormattedDate();
    window.sessionStorage.setItem("inTimestamp", inTimestamp);

    let clockInReq = {
      employeeId: this.employeeId,
      employeeName: this.employeeDetail.name
    }
    this.dataService.clockIn(clockInReq).subscribe((data: any) => {
      window.sessionStorage.setItem("timesheetId", data.id);
      // window.sessionStorage.setItem("timeIn", data.data.timeIn);
      // this.timeIn = data.data.timeIn;
      window.location.reload();
    })

  
    // this.timeIn = new Date(timeIn).toLocaleString("Asia/Singapore", {
    //   hour12: true,
    //   day: "2=digit"
    // })

  }

  clockOut() {
    
    let timeOut: any = Date.now() / 1000;
    console.log(timeOut)
    window.sessionStorage.setItem("timeOut", timeOut);
    let outTimestamp = this.getFormattedDate();
    this.outTimestamp = this.getFormattedDate();
    window.sessionStorage.setItem("outTimestamp", outTimestamp);

    this.startWork = false;
    window.sessionStorage.setItem("startWork", "false")

    let clockOutRequest = {
      description: this.clockOutForm.get("description").value
    }
    this.timesheetId = window.sessionStorage.getItem("timesheetId");
    this.timeIn = window.sessionStorage.getItem("timeIn");
    window.sessionStorage.setItem("description", this.clockOutForm.get("description").value)

    this.dataService.clockOut(this.timesheetId, clockOutRequest).subscribe((data: any) => {
      console.log(data);
      this.transferEther();
      window.sessionStorage.setItem("standardWorkPaid", "true")
      let amountPaid = "" + (8 * this.salaryRate);
      window.sessionStorage.setItem("amountPaid", amountPaid)

      this.router.navigate(['/paymentsuccess']).then(() => {
        window.location.reload();
      })
    })

    // this.ethcontractService.getEmployeeAccountInfo(this.employeeAccount).then((result: any) => {
    //   this.employeeBalance = result.balance.c[0] + "." + ("" + result.balance.c[1]).slice(0, 2);
    //   window.sessionStorage.setItem("employeeBalance", this.employeeBalance)
    // })

  }

  transferEther() {
    // this.salaryRate = 0.1;
    console.log("STart to transfer Ether")
    let transferFrom = "0xc883Da41Cb2D248d4C08509Ead7e9b7CaF520300"; // default
    // let transferFrom = "0xB48EA375f2E418BF470ccD4693F6C387b895A874"
    let transferTo = this.employeeAccount;
    let amount = this.salaryRate * 8;
    console.log(amount)
    let remarks = this.clockOutForm.get("description").value;

    this.ethcontractService.transferEther(transferFrom, transferTo, amount, remarks).then(function () {
      console.log("PAYMENT MADE")
    }).catch(function (error) {
      console.log(error);
    });
  }

  getFormattedDate() {
    var date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthShortNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "Nov", "December"
    ];
    var str = date.getDate() + " " + monthShortNames[(date.getMonth())] + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "pm";

    return str;
  }
}
