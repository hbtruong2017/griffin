import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employeeDetail: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.employeeDetail = JSON.parse(window.sessionStorage.getItem("employeeDetail"));
    let employeeId = "5daee7026fb70b0f746dd37b";
    this.dataService.getEmployeeDetails(employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      console.log(this.employeeDetail)
      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
    })
    
// {"deductRate":0,"_id":"5daee7026fb70b0f746dd37b","create_date":"2019-10-22T11:24:50.182Z","name":"Paul
// Griffin","gender":"Male","email":"paul.griffin@griffin.com","phone":9123456,"jobTitle":"CEO","jobType":"manager","salaryRate":100,"__v":0}

  }

}
