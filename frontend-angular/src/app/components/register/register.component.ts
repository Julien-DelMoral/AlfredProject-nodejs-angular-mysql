import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faScrewdriver } from '@fortawesome/free-solid-svg-icons';

// Services imports
import { AuthenticationService } from '../../services';
import { NotificationService } from '../../services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  logo = faScrewdriver;
  
  registerForm: FormGroup;
  submitted = false;
  invalidForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      name: ["", Validators.required],
      password: ["", Validators.required],
      passwordConfirmation: ["", Validators.required]
    });
    this.invalidForm=false;
  }

  register() {
    //vérification de la validité du formulaire
    if (this.registerForm.invalid){
      this.invalidForm=true;
      console.log("Erreur : Formulaire de connexion incomplet");
      return this.notificationService.displayToast('warning',"Formulaire de connexion incomplet");     
    }

    if(this.registerForm.value.password != this.registerForm.value.passwordConfirmation){
      this.invalidForm=true;
      console.log("Erreur : Les mots de passe ne sont pas identique");
      return this.notificationService.displayToast('warning',"Les mots de passe ne sont pas identique");      
    }

    var formValue = { 
      email : this.registerForm.value.email,
      name : this.registerForm.value.name,
      password : this.registerForm.value.password
    }

    this.authenticationService.register(formValue).subscribe(
      (res: {
        message: string
      }) => {
        this.submitted=true;
        return this.notificationService.displayToast('succes',res.message)
      },
      err => {
        console.log("Erreur : " + err.message);
        if (err.status === 409) {
          return this.notificationService.displayToast('error',err.message);
        }
        else {
          return this.notificationService.displayToast('error',"Serveur indisponible");
        }
      });
  }

  sendConfirmEmail(){
    var formValue = {
      email: this.registerForm.value.email,
    }
    
    this.authenticationService.confirmEmail(formValue).subscribe(
      (res: {
        message: string
      }) => {
        return this.notificationService.displayToast('succes',"Email de confirmation envoyé")
      },
      err => {
        console.log("Erreur : " + err.message);
        if (err.status === 409) {
          return this.notificationService.displayToast('error',err.message)
        }
        else {
          return this.notificationService.displayToast('error',"Serveur indisponible")
        }
      });

  }

  focusOutFunction(){
    if (!this.registerForm.invalid) {
      this.invalidForm=false;
      this.notificationService.dissmissSnackBar();
    }
  }
}

