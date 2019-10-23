import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  requestOTP(header: string) {
    return this.httpClient.post(environment.REQUEST_OTP_URL + header, '');
  }

  loginCustomer(header: string) {
    return this.httpClient.post(environment.LOGIN_CUSTOMER_URL + header, '');
  }

  getCustomerDetails(header: string) {
    return this.httpClient.post(environment.GET_CUSTOMER_DETAILS + header, '');
  }

  getEmployeeDetails(id: string) {
    return this.httpClient.get(environment.GET_EMPLOYEE_DETAILS + id);
  }

  clockIn(req: any) {
    return this.httpClient.post(environment.CLOCK_IN_URl_POST, req)
  }

  clockOut(id: string, req: any) {
    return this.httpClient.put(environment.CLOCK_OUT_URl_POST + id, req)
  }

}
