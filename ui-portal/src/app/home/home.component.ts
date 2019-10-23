import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employeeDetail: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    let employeeId = "5daee7026fb70b0f746dd37b";
    this.dataService.getEmployeeDetails(employeeId).subscribe((data: any) => {
      this.employeeDetail = data.data;
      console.log(this.employeeDetail)
      window.sessionStorage.setItem("employeeDetail", JSON.stringify(data.data))
    })
  }
}
