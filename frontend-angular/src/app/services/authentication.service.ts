import { Environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

// Services imports
import { NotificationService } from './notification.service';

@Injectable()
export class AuthenticationService {

  constructor(private _http: HttpClient, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) { }

  get csrfToken() {
    return localStorage.getItem("csrf_token")
  }

  login(user: any) {
    return this._http.post(`${Environment.apiUrl}/user/login/`, user, { observe: 'response', withCredentials: true, headers: new HttpHeaders().append('Content-Type', 'application/json') })
      .pipe(map(
        res => {
          let returnUrl = this.route.snapshot.queryParams.returnUrl || "/home";
          localStorage.setItem("csrf_token", JSON.stringify(res.body));
          localStorage.setItem("user_name", user.username);
          this.router.navigate([returnUrl])
        },
        err => {
          console.log("Erreur : " + err.message);
          if (err.status === 403) {
            this.notificationService.displayToast('error',err.message);
          }
          else {
            this.notificationService.displayToast('error',"Serveur indisponible");
          }
        }
      ));
  }

  logout() {
    localStorage.removeItem("csrf_token");
    localStorage.removeItem("user_name");
  }

  register(user: any) {
    return this._http.post(`${Environment.apiUrl}/user/register/`, user)
  }

  confirmEmail(email: any){
    return this._http.post(`${Environment.apiUrl}/user/sendConfirmEmail/`, email)
  }

  resetPassword(username: any) {
    return this._http.post(`${Environment.apiUrl}/user/resetPassword/`, username)
  }

  changePassword(formValues: any) {
    return this._http.post(`${Environment.apiUrl}/user/changePassword/`, formValues)
  }
}