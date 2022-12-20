import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { DomainUtills } from './domain-utills';
import { HttpResponseHandlerService } from './http-response-handler.service';

@Injectable()
export class DataService {
  private myDomain: string;
  private domainUtills = new DomainUtills();
  headers: HttpHeaders;
  constructor(
    protected httpClient: HttpClient,
    protected responseHandler: HttpResponseHandlerService
  ) {
    this.myDomain = this.domainUtills.GetDomain();
    this.headers = this.getHeaders();

  }
  public genericSericeCaller(callType: string, controlerActionName: string, data: any, baseUrl: string = "") {
    let apiUrl = !baseUrl ? this.myDomain + controlerActionName : baseUrl + controlerActionName;
    if (callType && controlerActionName) {
      if (callType == "post") {
        return this.httpClient
          .post(apiUrl, JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a), { headers: this.headers = this.getHeaders() })
          .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
      }
      else if (callType == "get") {
        return this.httpClient
          .get(apiUrl, { headers: this.headers = this.getHeaders(), params: {...data}})
          .pipe(catchError((err, source) => this.responseHandler.onCatch(err, source)));
      }
    }
    return;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append("Access-Control-Allow-Credentials", "true");
    headers = headers.append('Access-Control-Allow-Headers', '*');
    headers = headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers = headers.append('Accept', 'application/json');
    return headers;
  }


}