import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  employeeDetail: any;
  employeeId: any;
  amountPaid: string;
  outTimestamp: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.employeeId = "5daee7026fb70b0f746dd37b";
    this.dataService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      console.log(this.employeeDetail)
      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
    })

    this.amountPaid = window.sessionStorage.getItem("amountPaid")
    this.outTimestamp = window.sessionStorage.getItem("outTimestamp")

  }

  clockIn() {
    let clockInReq = {
      employeeId: this.employeeId,
      employeeName: this.employeeDetail.name
    }
    this.dataService.clockIn(clockInReq).subscribe((data: any) => {
      window.sessionStorage.setItem("timesheetId", data.id);
      window.sessionStorage.setItem("timeIn", data.data.timeIn);
      this.router.navigate(["/home"])
    })
  }

  routeToHome() {
    this.router.navigate(['/home']).then(()=>{
      window.location.reload();
    })
  }

}
