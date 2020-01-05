import { Injectable } from '@angular/core';
import config from '../../../config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigProviderService {

  constructor() { }

  public getApiBaseUrl(): object {
    return config.apiUrl;
  }
}
