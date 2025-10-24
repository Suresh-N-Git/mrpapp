import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe, Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetalertService } from '../sweetalert/sweetalert.service';
import { HomeService } from '../homeservice/home.service';

import { decompressJson, nonZeroMatSelectValidation, removeItemsFromArray } from '../core/common-functions';


@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  loginDetails: any;
  partList: any = [];
  selOutlet_Id: number = 0;

  constructor(
    private homeService: HomeService,
    private location: Location,
    public sweetAlert: SweetalertService,
  ) { }

  ngOnInit(): void {
    const state = history.state;
    this.selOutlet_Id = state?.outletId ?? 0;
    this.loginDetails = JSON.parse(sessionStorage.getItem('ssLoginDetails'));
    this.subscription.add(this.location.subscribe(loc => this.ngOnDestroy()));
    this.getPartsListOutlet();
  }

  getPartsListOutlet() {
    let inputJSON = {
      "FromApi": "PartsListOutlet",
      "PartNo": "",
      "PartDescription": "",
      "Login_Id": this.loginDetails.Login_Id,
      "Outlet_Id": +this.selOutlet_Id
    };
    this.subscription.add(
      this.homeService.genericCompressedAPI(inputJSON).subscribe({
        next: (res: any) => {
          if (res === null) {
            res = [];
            return;
          }
          const deCompressedData = decompressJson(res);
          this.partList = deCompressedData;
        }, error: (err) => {
          this.sweetAlert.show('Error', err, "error")
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
