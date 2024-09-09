import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient , private _AuthenticationService:AuthenticationService) { }

  

  checkOutOnline(idCart:string|null,shippingDetails: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${environment.urlServer}`,
      {
        "shippingAddress": shippingDetails
      }
    )
  }

  
}
