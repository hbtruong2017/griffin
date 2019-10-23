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
  employeeDetail: any;
  clockOutForm: FormGroup;

  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.employeeId = "5daee7026fb70b0f746dd37b";
    this.employeeId = window.sessionStorage.getItem("timesheetId");
    this.dataService.getEmployeeDetails(this.employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      console.log(this.employeeDetail)
      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
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
