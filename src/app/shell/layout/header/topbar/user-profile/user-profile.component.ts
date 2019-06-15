import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '@app/core/auth/authentication.service';
import { User } from '@app/shared/models/user.model';

// Services

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-user-profile',
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent implements OnInit {
  // ================================================
  // =              ATTRIBUTES SECTION              =
  // ================================================

  @HostBinding('class')
  classes =
    // tslint:disable-next-line:max-line-length
    'm-nav__item m-topbar__user-profile m-topbar__user-profile--img m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light';

  @HostBinding('attr.m-dropdown-toggle') attrDropdownToggle = 'click';

  // @Input() avatar = './assets/app/media/img/users/user4.jpg';
  // @Input() avatarBg: SafeStyle = '';

  @ViewChild('mProfileDropdown') mProfileDropdown: ElementRef;

  fullName = new BehaviorSubject<string>(null);
  userName = new BehaviorSubject<string>(null);
  avatar = new BehaviorSubject<string>(null);
  bgPicture = new BehaviorSubject<SafeStyle>(null);

  // ================================================
  // =             CONSTRUCTOR SECTION              =
  // ================================================

  constructor(private router: Router, private sanitizer: DomSanitizer, private authService: AuthenticationService) {
    this.authService.currentUser.subscribe(user => {
      this.fullName.next(user.firstName + ' ' + user.lastName);
      this.userName.next(user.username);
      this.avatar.next(user.avatar);
      this.bgPicture.next(this.sanitizer.bypassSecurityTrustStyle(`url(${user.bgPicture})`));
    });
    this.authService.login();
  }

  // ================================================
  // =                EVENT SECTION                 =
  // ================================================

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout();
  }
}
