import { Component, OnInit } from '@angular/core';
import { ISODateToyyyyMMdd } from '../core/common-functions';
import { Subject, Subscription } from 'rxjs';
import { HomeService } from '../homeservice/home.service';
import { SweetalertService } from '../sweetalert/sweetalert.service';
import { SharedMaterialModule } from '../SharedMaterialModule';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {


  outletList: any = [];
  loginDetails: any;
  subscription: Subscription = new Subscription();
  serverDate: any;
  showOutletData: boolean = false;

  constructor(
    private homeService: HomeService,
    public sweetAlert: SweetalertService
  ) { }


  ngOnInit(): void {
    this.loginDetails = JSON.parse(sessionStorage.getItem('ssLoginDetails'));
    console.log('this.loginDetails ', this.loginDetails)
    let isoSystemDate = (this.loginDetails.SystemDate) ? new Date(this.loginDetails.SystemDate) : new Date();
    this.serverDate = ISODateToyyyyMMdd(isoSystemDate);


    this.getDashboardDetails();

    // if (sessionStorage.getItem('ssoutletList')) {
    //   this.outletList = JSON.parse(sessionStorage.getItem('ssoutletList'));
    //   if (this.outletList.length > 0) {
    //     // this.setupDataTable();
    //   }
    // } else {
    //   this.getOutletList();
    // }
  }

  getDashboardDetails(): void {

    let inputJSON =
    {
      FromApi: "OutletListDashBoard",
      Pc_GuId: this.loginDetails?.Pc_GuId,
      Login_Id: this.loginDetails?.Login_Id
    };
    console.log('inputJSON', inputJSON)
    this.subscription.add(
      this.homeService.genericAPI(inputJSON).subscribe({
        next: (res: any) => {
          if (res === null) {
            res = [];
          }
          this.outletList = res;
          if (this.outletList.length > 0) {
            sessionStorage.setItem('ssoutletList', JSON.stringify(this.outletList));
            console.log('this.outletList ', this.outletList)
            this.showOutletData = true;

            // this.setupDataTable();
          }
        }, error: (error) => {
          this.sweetAlert.show('Error', error, "error")
        }
      })
    )
  }

  outletSelected(element) {

    this.sweetAlert.show("Success", JSON.stringify(element), "success")
    console.group(element)
  }
}
