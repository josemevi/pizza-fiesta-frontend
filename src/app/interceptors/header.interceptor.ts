import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      
    
        const authReq = req.clone({
          headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
        })
        return next.handle(authReq);
      
      
  }
  
}
