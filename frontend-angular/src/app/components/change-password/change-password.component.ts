import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faScrewdriver, faTimes, faCheckCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  logo = faScrewdriver;
  checkCircle = faCheckCircle;
  check = faCheck;
  times = faTimes;

  invalidForm = false;
  username = "";
  token = "";

  formIsValid = true;
  formValidation = {
    password: false,
    passwordConfirmation: false
  }
  passwordValidation = {
    length: false,
    number: false,
    lowercase: false,
    uppercase: false
  };

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

    if (!this.username || !this.token)
      this.router.navigate(['/login']);

    this.registerForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      password: ["", Validators.required],
      passwordConfirmation: ["", Validators.required]
    });
    this.invalidForm = false;
  }

  async reinitializePassword() {
    let formIsValid = await this.checkFormValues()
    if (formIsValid) {
      var formValue = {
        username: this.username,
        password: this.registerForm.value.password,
        token: this.token
      }

      this.authenticationService.changePassword(formValue).subscribe(
        (res: {
          message: string
        }) => {
          this.router.navigate(['/login']);
          this.notificationService.displayToast('success', res.message)
        },
        err => {
          console.log("Erreur : " + err.message);
          if (err.status === 401)
            this.notificationService.displayToast('error', err.message)
          else
            this.notificationService.displayToast('error', 'Serveur indisponible')

        });
    }
  }

  focusOutFunction() {
    if (!this.registerForm.invalid) {
      this.invalidForm = false
      this.notificationService.dissmissSnackBar()
    }
  }

  onChangePassword() {
    let lengthRegex = new RegExp(".{8,}")
    let numberRegex = new RegExp("[0-9]")
    let lowercaseRegex = new RegExp("[a-z]")
    let uppercaseRegex = new RegExp("[A-Z]")
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")

    if (this.registerForm.value.password == this.registerForm.value.passwordConfirmation && this.registerForm.value.passwordConfirmation)
      this.formValidation.passwordConfirmation = true
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
    let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")
    this.formIsValid = true

    if (!passwordRegex.test(this.registerForm.value.password)) {
      this.formValidation.password = false
      this.formIsValid = false
    }
    if (this.registerForm.value.password != this.registerForm.value.passwordConfirmation || !this.registerForm.value.passwordConfirmation) {
      this.formValidation.passwordConfirmation = false
      this.formIsValid = false
    }
    return this.formIsValid
  }
}
