import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  timesheet: any;
  duration: any;
  salaryRate: any;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.employeeId = "5daee7026fb70b0f746dd37b";
    this.employeeId = window.sessionStorage.getItem("employeeId");
    this.timesheetId = window.sessionStorage.getItem("timesheetId");
    this.salaryRate = window.sessionStorage.getItem("salaryRate");

    this.dataService.getTimesheet(this.timesheetId).subscribe((data: any) => {
      this.timesheet = data.data;
      this.duration = data.duration;
      console.log(this.timesheet)
    })

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
  }
}
