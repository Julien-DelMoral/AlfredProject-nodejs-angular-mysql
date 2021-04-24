// import angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Services imports
import { AuthenticationService } from '../../services';
import { NotificationService } from '../../services'
import { DataService } from '../../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  customers = {};
  logoIsAnimatedIn = true;
  logoIsAnimatedOut = false;

  constructor(
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private dataService: DataService,
    private _router: Router
  ) {

  }

  ngOnInit() {

    setTimeout(() => {
      this.logoIsAnimatedIn = false;
    }, 1000);

    this.dataService.getUserCustomers().subscribe(
      (res: {
        name: string,
        email: string,
        phone: string
      }[]) => {
        this.customers = res;
      },
      err => {
        console.log(err.message);
      }
    );
  }

  logout() {
    this.logoIsAnimatedOut = true;
    setTimeout(() => {
      this.authenticationService.logout()
      this._router.navigate(['/login'])
      this.notificationService.displayToast('succes',"Vous êtes maintenant déconnecté");
    }, 800);
  }

}
