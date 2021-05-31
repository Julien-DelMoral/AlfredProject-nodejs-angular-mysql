// Angular imports
import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faScrewdriver } from '@fortawesome/free-solid-svg-icons';

// Services imports
import { AuthenticationService } from '../../services';
import { NotificationService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logo = faScrewdriver;
  invalidForm = false;
  submitted = false;
  loginForm: FormGroup;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.csrfToken) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.invalidForm = false;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || "/home";
  }

  login() {

    if (this.loginForm.invalid) {
      this.invalidForm = true;
      console.log("Erreur : Formulaire de connexion incomplet");
      return this.notificationService.displayToast('warning',"Formulaire de connexion incomplet");
    }
    
    var formValue = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authenticationService.login(formValue).subscribe(
      res => {
        this.router.navigate([this.returnUrl]);
      },
      err => {
        console.log("Erreur : " + err.message);
        if (err.status === 401) {
          this.notificationService.displayToast('error',err.message);
        }
        else if (err.status === 403)
          this.submitted=true;
        else {
          this.notificationService.displayToast('error',"Serveur indisponible");
        }
      });
  }

  sendConfirmEmail(){
    var formValue = {
      email: this.loginForm.value.username,
    }
    this.authenticationService.confirmEmail(formValue).subscribe(
      (res: {
        message: string
      }) => {
        return this.notificationService.displayToast('succes',"Email de confirmation envoyé")
      },
      err => {
        console.log("Erreur : " + err.message);
        if (err.status === 409 || err.status === 401) {
          return this.notificationService.displayToast('error',err.message)
        }
        else {
          return this.notificationService.displayToast('error',"Serveur indisponible")
        }
      });

  }

  focusOutFunction() {
    if (!this.loginForm.invalid) {
      this.invalidForm = false;
      this.notificationService.dissmissSnackBar();
    }
  }
}
