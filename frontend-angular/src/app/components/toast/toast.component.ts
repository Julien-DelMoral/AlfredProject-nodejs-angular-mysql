import { Component, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor( private snackBar: MatSnackBar , @Inject(MAT_SNACK_BAR_DATA) public data: any ) {}

  dismiss(){
    this.snackBar.dismiss();
  }
}
