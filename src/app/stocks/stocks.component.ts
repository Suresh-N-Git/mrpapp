import { Component, OnInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe, Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SweetalertService } from '../sweetalert/sweetalert.service';
import { HomeService } from '../homeservice/home.service';

import { decompressJson, nonZeroMatSelectValidation, removeItemsFromArray } from '../core/common-functions';
import { SharedMaterialModule } from '../SharedMaterialModule';


@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.scss'
})
export class StocksComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  loginDetails: any;
  partList: any = [];
  filteredList: any = [];
  searchText = '';

  selOutlet_Id: number = 0;
  selOutletName: string = '';
  partsListReady: boolean = false

  constructor(
    private homeService: HomeService,
    private location: Location,
    public sweetAlert: SweetalertService,
  ) { }

  ngOnInit(): void {
    const state = history.state;
    this.selOutlet_Id = state?.outletId ?? 0;
    this.selOutletName = state?.outletName ?? '';
    this.loginDetails = JSON.parse(sessionStorage.getItem('ssLoginDetails'));
    this.subscription.add(this.location.subscribe(loc => this.ngOnDestroy()));
    this.getPartsListOutlet();
  }

  getPartsListOutlet() {
    let inputJSON = {
      "FromApi": "PWA_PARTLISTWITHSTOCK",
      "Login_Id": +this.loginDetails.Login_Id,
      "Outlet_Id": +this.selOutlet_Id
    };

    console.log('inputJSON ', inputJSON)
    this.subscription.add(
      this.homeService.genericCompressedAPI(inputJSON).subscribe({
        next: (res: any) => {
          if (res === null) {
            res = [];
            return;
          }
          const deCompressedData = decompressJson(res);
          this.partList = deCompressedData;
          this.filteredList = deCompressedData;
          // console.log('this.partList ', this.partList)
          // this.sweetAlert.show('Success', "Part List Downloaded", "success")
          this.partsListReady = true;
        }, error: (err) => {
          this.sweetAlert.show('Error', err, "error")
        }
      })
    )
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    const search = input.value.trim().toLowerCase();
    this.searchText = search;

    console.log(this.searchText)
    if (!search) {
      this.filteredList = [...this.partList];
      return;
    }

    this.filteredList = this.partList.filter(p =>
      p.Part.toLowerCase().includes(search) ||
      String(p.MRP).includes(search) ||
      String(p.SoH).includes(search)
    );
  }

  // trackBy function for *ngFor
  trackBySlNo(index: number, item: { SlNo?: number }): number | number {
    // return unique id if present, else fallback to index
    return item && item.SlNo != null ? item.SlNo : index;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
