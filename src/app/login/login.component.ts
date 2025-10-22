import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedMaterialModule } from '../SharedMaterialModule';
import { SharedDirectiveModule } from '../SharedDirectivesModule';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../homeservice/home.service';
import { Subscription } from 'rxjs';
import { SweetalertService } from '../sweetalert/sweetalert.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule, SharedDirectiveModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  changeForm: FormGroup;
  showPassword = false; // toggle state
  subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private route: Router,
    public homeService: HomeService,
    public sweetAlert: SweetalertService) {
    this.getepData();
  }

  ngOnInit(): void {
    sessionStorage.clear();
    //localStorage.clear();
    this.loginForm = this.fb.group({
      txtLoginName: [''],
      txtLoginPassword: ['']
    });

    this.changeForm = this.fb.group({
      txtLoginName: [''],
      txtOldPassword: [''],
      txtNewPassword: [''],
      txtConfirmPassword: ['']
    })

    this.showInfo('Success', 'Success Message', 'success')
     // this.showConfirm()
    // this.sweetAlert.show("Success","Confirm Sweet Alert", "success")
    // this.getLoginTableSchema();
    // this.getChangeTableSchema();
  }

  get loginControl() { return this.loginForm.controls }
  get control() { return this.changeForm.controls }

  getepData() {
    //https://www.techiediaries.com/angular-local-json-files/ // epdata is endpointdata
    this.subscription.add(
      this.homeService.getepData().subscribe({
        next: (response: any) => {
          console.log('getepData ', response)
          this.homeService.baseURLCommon = response.baseURL + 'Common/';
          sessionStorage.setItem('baseURL', response.baseURL + 'Common/');
          sessionStorage.setItem('helpURL', response.helpURL);
        }, error: (err) => {
          alert(err)
          // this.alertService.openDialog('Error', err);
        }
      })
    )
  }

   showInfo(typeOfInfo, infoMessage, infoIcon) {
    // infoIcon = error, info, question, success, warning
    this.sweetAlert.show(typeOfInfo, infoMessage, infoIcon);
  }

  showConfirm() {
    this.sweetAlert.confirm('Proceed ?', 'Do you really want to continue?')
      .then(res => {
        if (res.isConfirmed) {
          this.sweetAlert.show('Confirmed', 'Action executed successfully!', 'success');
        }
      });
  }

  loginSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else if (this.loginControl['txtLoginPassword'].value
      && this.loginControl['txtLoginPassword'].value.toLowerCase() === 'password') {
      alert('Default Password Cannot Be used. Change Password to Login')
      // this.alertService.openDialog('Error', 'Default Password Cannot Be used. Change Password to Login');
      return;
    }

    //   // https://stackoverflow.com/questions/71471860/angular-subscribe-is-deprecated
    this.subscription.add(
      this.homeService.validateLogin(this.loginControl['txtLoginName'].value,
        this.loginControl['txtLoginPassword'].value).subscribe({
          next: (response: any) => {
            sessionStorage.setItem('ssLoginDetails', JSON.stringify(response[0]));
            sessionStorage.setItem('loginName', this.loginControl['txtLoginName'].value)
            this.route.navigate(['home/dashboard']).then(() => {
              this.loginForm.reset();
            })
          }, error: (err) => {
            alert(err)
            // this.alertService.openDialog('Error', err);
          }
        })
    )
  }
}
