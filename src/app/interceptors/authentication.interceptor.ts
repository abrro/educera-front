import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private AuthenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.AuthenticationService.isLoggedIn()) {
      request = request.clone({
          setHeaders:
            { Authorization: `Bearer ${this.AuthenticationService.getToken()}` }
        }
      );
    }

    return next.handle(request);
  }
}
