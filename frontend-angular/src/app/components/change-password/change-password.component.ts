import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faScrewdriver } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  logo = faScrewdriver;
  invalidForm = false;
  username = "";
  token = "";

  registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {

    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
      this.token = params['token'];
      
  });
    
  }

  ngOnInit() {

    if(!this.username || !this.token)
      this.router.navigate(['/login']);

    this.registerForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      password: ["", Validators.required],
      passwordConfirmation: ["", Validators.required]
    });
    this.invalidForm=false;
  }

  reinitializePassword() {
    if (this.registerForm.invalid){
      this.invalidForm=true
      console.log("Erreur : Formulaire de connexion incomplet")
      return this.notificationService.displayToast('warning','Formulaire incomplet')     
    }

    if(this.registerForm.value.password != this.registerForm.value.passwordConfirmation){
      this.invalidForm=true;
      console.log("Erreur : Confirmation du mot de passe éronée")
      return this.notificationService.displayToast('warning','Les mots de passe ne sont pas identique')       
    }

    var formValue = { 
      username : this.username,
      password : this.registerForm.value.password,
      token    : this.token
    }

    this.authenticationService.changePassword(formValue).subscribe(
      (res: {
        message: string
      }) => {
        this.router.navigate(['/login']);
        this.notificationService.displayToast('success',res.message)
      },
      err => {
        console.log("Erreur : " + err.message);
        if (err.status === 401) 
          this.notificationService.displayToast('error',err.message)
        else 
          this.notificationService.displayToast('error','Serveur indisponible')
        
      });

  }

  focusOutFunction(){
    if (!this.registerForm.invalid) {
      this.invalidForm=false
      this.notificationService.dissmissSnackBar()
    }
  }

}
