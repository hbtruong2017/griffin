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
  transferFrom: string = "0x592237E4A645145A32E08E787f5c216E4F915552";
  balance: string = "0 ETH";
  transferTo: string = "0xC1a082E97f666Cbf9C31290aAf49C17c03Beed0c";
  amount: number = 5;
  remarks = "Test 1";

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
