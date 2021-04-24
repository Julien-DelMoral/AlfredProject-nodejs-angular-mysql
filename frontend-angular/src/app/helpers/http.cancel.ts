import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HttpCancel {
  private cancelPendingRequests$ = new Subject<void>()

  constructor() { }

  /** Cancels all pending Http requests. */
  public cancelPendingRequests() {
    this.cancelPendingRequests$.next()
  }

  public onCancelPendingRequests() {
    return this.cancelPendingRequests$.asObservable()
  }

}