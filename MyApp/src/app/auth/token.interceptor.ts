/* ------------------------------------------------------------------
   Adds  Authorization: Bearer <token>  to every outgoing HttpClient
   request when a JWT is stored in localStorage under "token".
   -----------------------------------------------------------------*/
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler):
    Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);          // no token:  pass through
    }

    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next.handle(authReq);
  }
}
