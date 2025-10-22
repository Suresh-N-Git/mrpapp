import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedMaterialModule } from '../SharedMaterialModule';
import { SharedDirectiveModule } from '../SharedDirectivesModule';

@Component({
  selector: 'app-login',
  standalone: true,
 imports: [CommonModule, SharedMaterialModule, SharedDirectiveModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
showPassword = false; // toggle state
}
