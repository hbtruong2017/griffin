import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { EthcontractService } from '../service/ethcontract.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accounts: any;
  transferFrom = "0x48EcE0Ae91d0b77D41eE67AE71508DfF154FCc61";
  balance = "0 ETH";
  transferTo = "";
  amount = 0;
  remarks = "";

  constructor(private ethcontractService: EthcontractService) {
    this.initAndDisplayAccount();
  }

  ngOnInit() {
  }

  initAndDisplayAccount = () => {
    let that = this;
    this.ethcontractService.getAccountInfo().then(function (acctInfo: any) {
      that.transferFrom = acctInfo.fromAccount;
      that.balance = acctInfo.balance;
      console.log(that.transferFrom);
      console.log(that.balance)
    }).catch(function (error) {
      console.log(error);
    });
  };
  transferEther(event) {
    let that = this;
    console.log("From:" + this.transferFrom)

    console.log("To:" + this.transferTo)
    this.ethcontractService.transferEther(
      this.transferFrom,
      this.transferTo,
      this.amount,
      this.remarks
    ).then(function () {
      that.initAndDisplayAccount();
    }).catch(function (error) {
      console.log(error);
      that.initAndDisplayAccount();
    });
  }
}
