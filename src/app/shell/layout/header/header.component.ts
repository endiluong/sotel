import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router
} from '@angular/router';

// Vendors
import { LoadingBarService } from '@ngx-loading-bar/core';

// Services
import { LayoutRefService } from '@app/shared';
import { HeaderService } from '@app/shared';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('mHeader') mHeader: ElementRef;

  constructor(
    private router: Router,
    private layoutRefService: LayoutRefService,
    public headerService: HeaderService,
    public loader: LoadingBarService
  ) {
    // page progress bar percentage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // set page progress bar loading to start on NavigationStart event router
        this.loader.start();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loader.increment(35);
      }
      if (event instanceof RouteConfigLoadEnd) {
        this.loader.increment(75);
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // set page progress bar loading to end on NavigationEnd event router
        this.loader.complete();
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // keep header element in the service
    this.layoutRefService.addElement('header', this.mHeader.nativeElement);
  }
}
