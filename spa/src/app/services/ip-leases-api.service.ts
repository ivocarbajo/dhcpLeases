import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IpLease } from '../models/IpLease';
import { getLocaleDateTimeFormat } from '@angular/common';
import { ConfigProviderService } from './config-provider.service';

@Injectable({
  providedIn: 'root'
})
export class IpLeasesApiService {
  private apiUrl = this.configProvider.getApiBaseUrl();

  constructor(private http: HttpClient, private configProvider: ConfigProviderService) { }

  public getLeases(): Observable<IpLease[]> {
    const endpoint = '/v1/ip/leases/all';

    return this.http.get<IpLease[]>(this.apiUrl + endpoint);
  }
}
