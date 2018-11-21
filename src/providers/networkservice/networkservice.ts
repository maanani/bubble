import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular'
import { Network } from '@ionic-native/network'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the NetworkserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable()
export class NetworkserviceProvider {
  public status: ConnectionStatus;
  private _status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(null);

  constructor(public network: Network,
    public events: Events) {
      this.status = ConnectionStatus.Online;
    console.log('Hello NetworkserviceProvider Provider');
  }
  public initializeNetworkEvents(): void {

    console.log('Subscribe to onDisconnect events');
    /* OFFLINE */
    this.network.onDisconnect().subscribe(() => {
        if (this.status === ConnectionStatus.Online) {
            this.setStatus(ConnectionStatus.Offline);
            console.log(this.status+ 'disconnection');
        }
    })

    console.log('Subscribe to onConnect events');
    /* ONLINE */
    this.network.onConnect().subscribe(() => {
        if (this.status === ConnectionStatus.Offline) {
            this.setStatus(ConnectionStatus.Online);
            console.log(this.status+ 'connection');
        }
    })

}
private setStatus(status: ConnectionStatus) {
  this.status = status;
  this._status.next(this.status);
  console.log(this._status+ 'and' +this._status.next(this.status));
}
public getNetworkType(): string {
  return this.network.type
}

public getNetworkStatus(): Observable<ConnectionStatus> {
  return this._status.asObservable(); 
}
}
