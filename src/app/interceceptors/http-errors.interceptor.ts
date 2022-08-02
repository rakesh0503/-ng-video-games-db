import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError as observableThrowError,  Observable } from "rxjs";
import { catchError} from "rxjs/operators";




@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError((err)=>{
                console.log(err);
                return observableThrowError(err)
            })
        )
    }
}