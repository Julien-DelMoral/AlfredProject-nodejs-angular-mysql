import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faScrewdriver, faTimes, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons';

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
  checkCircle = faCheckCircle;
  check = faCheck;
  times= faTimes;

  registerForm: FormGroup;
  submitted = false;
  formIsValid = true;
  formValidation = {
    email: false,
    name: false,
    password: false,
    passwordConfirmation: false
  }
  passwordValidation = {
    length: false,
    number: false,
    lowercase: false,
    uppercase: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      name: ["", Validators.required],
      password: ["", Validators.required],
      passwordConfirmation: ["", Validators.required]
    });
    this.formIsValid = true;
  }

  async register() {

    let formIsValid = await this.checkFormValues()
    
    if (formIsValid) {

      var formValue = {
        email: this.registerForm.value.email,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password
      }

      this.authenticationService.register(formValue).subscribe(
        (res: {
          message: string
        }) => {
          this.submitted = true;
          return this.notificationService.displayToast('succes', res.message)
        },
        err => {
          console.log("Erreur : " + err.message);
          if (err.status === 409) {
            return this.notificationService.displayToast('error', err.message);
          }
          else {
            return this.notificationService.displayToast('error', "Serveur indisponible");
          }
        });
    }
  }

  sendConfirmEmail() {
    var formValue = {
      email: this.registerForm.value.email,
    }

    this.authenticationService.confirmEmail(formValue).subscribe(
      (res: {
        message: string
      }) => {
        return this.notificationService.displayToast('succes', "Email de confirmation envoyé")
      },
      err => {
        console.log("Erreur : " + err.message);
        if (err.status === 409) {
          return this.notificationService.displayToast('error', err.message)
        }
        else {
          return this.notificationService.displayToast('error', "Serveur indisponible")
        }
      });

  }

  onChangeEmail() {
    let emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", 'g')

    if (emailRegex.test(this.registerForm.value.email)) {
      this.formValidation.email = true 
    }
    else {
      this.formValidation.email = false
    }
  }

  onChangeName() {
    let nameRegex = new RegExp(".{2,}", 'g')

    if (nameRegex.test(this.registerForm.value.name)) {
      this.formValidation.name = true 
    }
    else {
      this.formValidation.name = false
    }
  }

  onChangePassword() {
    let lengthRegex = new RegExp(".{8,}")
    let numberRegex = new RegExp("[0-9]")
    let lowercaseRegex = new RegExp("[a-z]")
    let uppercaseRegex = new RegExp("[A-Z]")
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")

    if (this.registerForm.value.password == this.registerForm.value.passwordConfirmation && this.registerForm.value.passwordConfirmation)
      this.formValidation.passwordConfirmation =  true 
    else
      this.formValidation.passwordConfirmation = false

    if (passwordRegex.test(this.registerForm.value.password)) {
      this.formValidation.password = true 
      this.passwordValidation.length = true
      this.passwordValidation.number = true
      this.passwordValidation.uppercase = true
      this.passwordValidation.lowercase = true
    }
    else {
      this.formValidation.password = false

      if (lengthRegex.test(this.registerForm.value.password)) {
        this.passwordValidation.length = true
      }
      else {
        this.passwordValidation.length = false
      }
      if (numberRegex.test(this.registerForm.value.password)) {
        this.passwordValidation.number = true
      }
      else {
        this.passwordValidation.number = false
      }
      if (lowercaseRegex.test(this.registerForm.value.password)) {
        this.passwordValidation.lowercase = true
      }
      else {
        this.passwordValidation.lowercase = false
      }
      if (uppercaseRegex.test(this.registerForm.value.password)) {
        this.passwordValidation.uppercase = true
      }
      else {
        this.passwordValidation.uppercase = false
      }
    }
  }

  onChangePasswordConfirmation() {
    if (this.registerForm.value.password == this.registerForm.value.passwordConfirmation && this.registerForm.value.passwordConfirmation)
      this.formValidation.passwordConfirmation = true 
    else
      this.formValidation.passwordConfirmation = false
  }

  async checkFormValues(): Promise<boolean> {
    let emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", 'g')
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")
    let nameRegex = new RegExp(".{2,}", 'g')
    this.formIsValid = true

    if (!emailRegex.test(this.registerForm.value.email)) {
      this.formValidation.email = false 
      this.formIsValid = false
    }
    if (!nameRegex.test(this.registerForm.value.name)) {
      this.formValidation.name = false 
      this.formIsValid = false
    }
    if (!passwordRegex.test(this.registerForm.value.password)) {
      this.formValidation.password = false 
      this.formIsValid = false
    }
    if (this.registerForm.value.password != this.registerForm.value.passwordConfirmation || !this.registerForm.value.passwordConfirmation) {
      this.formValidation.passwordConfirmation =  false 
      this.formIsValid = false
    }
    return this.formIsValid
  }


}

