import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request= req.clone({setHeaders:{demo: 'test 23'}})
      return next.handle(request).pipe(
        tap((evt) => {
          if (evt instanceof HttpResponse) {
            console.log(evt);
          }
        }),

        catchError((error:HttpErrorResponse) => {
          if(confirm("El id ingresado ya existe")){
            if(error.status === 409){

              console.log('se daño esta vaina');

            }
          }
          return throwError(error);
        })
      );
      }


}
