// imports angular
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//import services
import { AuthenticationService } from '../services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
        let csrfToken = this.authenticationService.csrfToken;
        if (csrfToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${csrfToken}`,
                    observe:'body',
                    
                },
                withCredentials:true,
                headers:new HttpHeaders().append('Content-Type','application/json')
            });
        }

        return next.handle(request);
    }
}