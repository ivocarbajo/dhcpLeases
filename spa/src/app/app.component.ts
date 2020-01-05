import { Component } from '@angular/core';
import { IpLease } from './models/IpLease';
import { IpLeasesApiService } from './services/ip-leases-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dhcp Monitor';
  ipLeases: object;

  constructor(private leasesApi: IpLeasesApiService) { }

  ngOnInit() {
    this.leasesApi.getLeases().subscribe(data => {
      console.log(data);
      this.ipLeases = data;
    });
  }
}
