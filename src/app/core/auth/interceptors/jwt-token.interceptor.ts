import { HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpXsrfTokenExtractor } from "@angular/common/http";
import { SessionService } from "../services/session.service";
import { inject, Injectable } from "@angular/core";

export const JwtTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenService = inject(SessionService);

  const authToken = tokenService.getSession()?.accessToken;

  const authReq = authToken
  ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
  : req;

  return next(authReq);
};