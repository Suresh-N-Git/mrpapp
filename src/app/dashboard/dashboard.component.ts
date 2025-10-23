import { Component, OnInit } from '@angular/core';
import { ISODateToyyyyMMdd } from '../core/common-functions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  loginDetails: any;
  serverDate: any;

  ngOnInit(): void {
    this.loginDetails = JSON.parse(sessionStorage.getItem('ssLoginDetails'));

    console.log('this.loginDetails ', this.loginDetails)
    let isoSystemDate = (this.loginDetails.SystemDate) ? new Date(this.loginDetails.SystemDate) : new Date();
    console.log('this.isoSystemDate ', isoSystemDate)
    this.serverDate = ISODateToyyyyMMdd(isoSystemDate);
    console.log('this.serverDate ', this.serverDate)

    // if (sessionStorage.getItem('ssoutletList')) {
    //   this.outletList = JSON.parse(sessionStorage.getItem('ssoutletList'));
    //   if (this.outletList.length > 0) {
    //     // this.setupDataTable();
    //   }
    // } else {
    //   this.getOutletList();
    // }
  }

}
