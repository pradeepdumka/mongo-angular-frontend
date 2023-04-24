import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from '../services/main.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private mainService: MainService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let isUser: any = this.mainService.getDataFromStorage('userData');
    let user = JSON.parse(isUser);
    let token = user?.accessToken;
    if (
      !request.url.includes('auth/login') ||
      !request.url.includes('auth/signup')
    ) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}
