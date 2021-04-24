import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faScrewdriver } from '@fortawesome/free-solid-svg-icons';

// Services imports
import { AuthenticationService } from '../../services';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  logo = faScrewdriver;
  
  resetPasswordForm: FormGroup;
  submitted = false;
  invalidForm = false;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {

    if (this.authenticationService.csrfToken) {
      this.router.navigate(['/home']);
    }

  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      username: ["", Validators.required]
    });
    this.invalidForm = false;
  }


  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.invalidForm = true;
      console.log("Erreur : Formulaire incomplet");
      return this.notificationService.displayToast('warning',"Formulaire incomplet");
    }

    var formValue = {
      username: this.resetPasswordForm.value.username,
    }

    this.authenticationService.resetPassword(formValue).subscribe(
        (res: {
          message: string
        }) => {
          this.submitted=true;
        },
        err => {
          console.log("Erreur : " + err.message);
          if (err.status === 401) {
            return this.notificationService.displayToast('error',err.message);
          }
          else {
            return this.notificationService.displayToast('error',"Serveur indisponible");
          }
        });
  }

  focusOutFunction() {
    if (!this.resetPasswordForm.invalid) {
      this.invalidForm = false;
      this.notificationService.dissmissSnackBar();
    }
  }
}
