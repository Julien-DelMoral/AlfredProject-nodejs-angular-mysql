import { Injectable,ViewChild, ElementRef } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// Services imports
import { AuthenticationService } from './../services';
import { NotificationService } from './../services';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    @ViewChild('flash', {} as any) warnings: ElementRef;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService: NotificationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let isLoggedIn = this.authenticationService.csrfToken

        if (isLoggedIn) {
            return true
        }

        console.log("Vous devez être connecté pour accéder à cette page")
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } })
        this.notificationService.displayToast('info',"Vous devez être connecté pour accéder à cette page");
        return false
    }
}