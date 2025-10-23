import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedMaterialModule } from './SharedMaterialModule';
import { HomeService } from './homeservice/home.service';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isLoading: Subject<boolean>;
  subscription: Subscription = new Subscription();


  constructor(
    public homeService: HomeService,
  ) { }
  title = 'mrpapp';


  ngOnInit(): void {
    this.isLoading = this.homeService.isLoading;
  }
}
