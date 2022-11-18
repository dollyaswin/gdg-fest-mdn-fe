import { filter, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/shared/layout/layout.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from 'src/app/home/pages/add-book/add-book.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styles: [
    `
      .center {
        position: absolute;
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
      }

      .overlay {
        height: 100vh;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.286);
        z-index: 10;
        top: 0;
        left: 0;
        position: fixed;
      }
    `,
  ],
})
export class PublicLayoutComponent implements OnInit {
  public screenSize: any;

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = true;

  title = "Home"

  loading: boolean = false;

  Subscription: Subscription;
  constructor(
    private responsive: BreakpointObserver,
    private ls: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,

  ) {
    this.Subscription = ls.getLoading((bol) => (this.loading = bol));
  }

  ngOnInit(): void {
    this.router.events.pipe(filter((e): boolean => e instanceof NavigationEnd))
    .subscribe((): void => {
      let deepest = this.route.snapshot

      while (!!deepest.firstChild) deepest = deepest.firstChild
      this.title = deepest.data['title'] || 'DevFest'
      this.ls.setTitle(`DevFest - ${this.title}`)
    })


    this.ls.onTitle((val) => {
      this.title = val
      this.ls.setTitle(`DevFest - ${val}`)
    })

    this.ls.onNotification((val) => {
      this.snackbar.open(val.message, 'OK', {
        panelClass: val.color,
        politeness: 'polite',
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: val.duration || 3000,
      })
    })
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
