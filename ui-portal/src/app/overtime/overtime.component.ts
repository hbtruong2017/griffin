import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.css']
})
export class OvertimeComponent implements OnInit {
  timesheet:any;
  showOvertime: boolean = true;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTimesheet(window.sessionStorage.getItem("timesheetId")).subscribe((data: any) => {
      this.timesheet = data.data;
      this.timesheet.timeIn = window.sessionStorage.getItem("inTimestamp")
      this.timesheet.timeOut = window.sessionStorage.getItem("outTimestamp")
    })

  }

  updateOvertime() {
    this.showOvertime = false;
  }
}
