import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $(document).ready(function () {
    //   $('#bonus-goal-progress').goalProgress({
    //     goalAmount: 100000,
    //     currentAmount: 80000,
    //     textBefore: '$',
    //     textAfter: ' sales revenue'
    //   });

    //   $('#bonus-goal-progress-2').goalProgress({
    //     goalAmount: 50000,
    //     currentAmount: 50000,
    //     textBefore: '$',
    //     textAfter: ' sales revenue'
    //   });
    // })
  }
}
