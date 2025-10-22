import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class SweetalertService {

  isMobile = window.innerWidth < 500;

  constructor() { }


  show(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'info',
    confirmText = 'OK'
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      width: this.isMobile ? '90vw' : '512px',//👈 make it smaller (default is ~32em ≈ 512px)
      // padding: '1em',           // reduce internal spacing
      confirmButtonText: confirmText,
      background: '#1e293b',         // slate background
      color: '#f8fafc',              // light text
      confirmButtonColor: '#3b82f6', // blue accent
      customClass: {
        popup: 'rounded-2xl shadow-lg',
        title: 'text-lg font-semibold',
      },
    });
  }

  confirm(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'warning'
  ) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#ef4444',
      background: '#1e293b',
      color: '#f8fafc',
      customClass: {
        popup: 'rounded-2xl shadow-xl',
        title: 'text-lg font-semibold',
      },
    });
  }
}
