import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";





@Injectable()
export class HttpHeadersIterceptor implements HttpInterceptor{

    // 0e2640c435644e2e90c6c397e7173121
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        req = req.clone({
            setHeaders:{
                'x-rapidapi-key':'esGbwrm390mshS2BCl0RALxQRtZTp1W7sFMjsnyJlJzDXVkW0H',
                'x-rapidapi-host':'rawg-video-games-database.p.rapidapi.com'
            },
            setParams:{
                key:'kjfdhgjkdfgdkfjgkdf'
            }
        })
        return next.handle(req);
    }
    
}