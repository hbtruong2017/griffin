import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EthcontractService } from '../service/ethcontract.service';

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

  constructor(private dataService: DataService, private ethcontractService: EthcontractService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.employeeId = "5daee7026fb70b0f746dd37b";
    this.employeeId = window.sessionStorage.getItem("employeeId");
    this.timesheetId = window.sessionStorage.getItem("timesheetId");
    this.salaryRate = window.sessionStorage.getItem("salaryRate");
    this.timeIn = window.sessionStorage.getItem("timeIn");
    this.duration = (Date.now().getTime() - this.timeIn.getTime()) / (60*1000)

    this.clockOutForm = this.formBuilder.group({
      description: ['', Validators.required]
    })
  }

  clockOut() {
    let clockOutRequest = {
      description: this.clockOutForm.get("description").value
    }
    this.dataService.clockOut(this.employeeId, clockOutRequest).subscribe((data:any) => {
      console.log(data);
    })
    this.transferEther();
  }

  transferEther() {
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
