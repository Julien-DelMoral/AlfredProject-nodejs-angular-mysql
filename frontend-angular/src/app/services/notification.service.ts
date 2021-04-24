import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as toastr from 'toastr';

// Components import
import { ToastComponent } from '../components/toast/toast.component'


@Injectable()
export class NotificationService {
    
  constructor(private snackBar: MatSnackBar) { }

  displaySnackBar(message: string){
    this.snackBar.openFromComponent(ToastComponent, {
      duration: 2.5 * 1000,
      data:message
    });
  }

  displayToast(type:string, message: string){
    if(type == 'info')
      toastr.info(message)
    if(type == 'succes')
      toastr.success(message)
    if(type == 'warning')
      toastr.warning(message)
    if(type == 'error')
      toastr.error(message)
  }

  dissmissSnackBar(){
    this.snackBar.dismiss();
  }
}