import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { EthcontractService } from '../service/ethcontract.service';

@Component({
  selector: 'app-pre-home',
  templateUrl: './pre-home.component.html',
  styleUrls: ['./pre-home.component.css']
})
export class PreHomeComponent implements OnInit {
  employeeDetail: any;
  employeeId: any;
  employeeAccount: string = "0xC1a082E97f666Cbf9C31290aAf49C17c03Beed0c";
  employeeBalance: any;

  constructor(private dataService: DataService, private router: Router, private ethService: EthcontractService) { }

  ngOnInit() {
    this.employeeId = "5daee7026fb70b0f746dd37b";
    this.dataService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      console.log(this.employeeDetail)
      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
      window.sessionStorage.setItem("employeeId", data.data._id)
      window.sessionStorage.setItem("salaryRate", data.data.salaryRate)
    })

    this.ethService.getEmployeeAccountInfo(this.employeeAccount).then((result:any) => {
      this.employeeBalance = result.balance.c[0] + "." + ("" + result.balance.c[1]).slice(0,2);
      window.sessionStorage.setItem("employeeBalance", this.employeeBalance )
    })
  }

  clockIn() {
    this.router.navigate(["/home"])

    let clockInReq = {
        employeeId: this.employeeId,
	      employeeName: this.employeeDetail.name
    }
    this.dataService.clockIn(clockInReq).subscribe((data: any) => {
      window.sessionStorage.setItem("timesheetId", data.id);
      window.sessionStorage.setItem("timeIn", data.data.timeIn);
      this.router.navigate(["/home"]).then(() => {
        window.location.reload();
      })
    })
  }

}
