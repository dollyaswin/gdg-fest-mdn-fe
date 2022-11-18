import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

type Notification = {
  message: string;
  color: string;
  duration?: number;
};

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private location: Location) {}

  /************************************************************
   *                    Member Variables
   ************************************************************/
  private titleObs = new Subject<string>();

  private notifObs = new Subject<Notification>();

  loading = new BehaviorSubject<boolean>(false);

  /**
   * set loading status
   * @param v loading
   */
  setLoading(bol: boolean) {
    this.loading.next(bol);
  }

  getLoading(sub: (bol: boolean) => void) {
    return this.loading.subscribe(sub);
  }

  /**
   * set the page title and browser title
   * will override the route title
   * @param v
   */
  public setTitle(v: string): void {
    this.titleObs.next(v);
  }

  /**
   * attach a listener to title changes
   * @param cb callback when title changes
   * @returns
   */
  public onTitle(cb: (v: string) => any): Subscription {
    return this.titleObs.subscribe(cb);
  }

  /**
   * catch error and extract the message
   * @param e
   */
  public catchError(e: any): void {
    console.log(`e is:`, e);
    const message = e.error.detail ?? e.message;
    this.notifObs.next({ message, color: 'warn' });
  }

  /**
   * set Notification message
   * @param v Notification obj
   */
  public setNotification(v: Notification): void {
    this.notifObs.next(v);
  }

  /**
   * attach a listener to Notification changes
   * @param cb callback when Notification changes
   * @returns
   */
  public onNotification(cb: (v: Notification) => any): Subscription {
    return this.notifObs.subscribe(cb);
  }

  /** Go back to previous page */
  public back(): void {
    this.location.back();
  }
}
