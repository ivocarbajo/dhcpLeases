export class IpLease {
  ip: string;
  macAddress: string;
  clientHostName: string;
  bindingState: boolean;

  constructor(ip: string, mac: string, hostname: string, binding: boolean) {
    this.ip = ip;
    this.macAddress = mac;
    this.clientHostName = hostname;
    this.bindingState = binding;
  }
}
