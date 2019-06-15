import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

// Custom Directives
import { MenuAsideDirective } from './directives/menu-aside.directive';
import { MenuAsideOffcanvasDirective } from './directives/menu-aside-offcanvas.directive';
import { MenuHorizontalOffcanvasDirective } from './directives/menu-horizontal-offcanvas.directive';
import { MenuHorizontalDirective } from './directives/menu-horizontal.directive';
import { ScrollTopDirective } from './directives/scroll-top.directive';
import { HeaderDirective } from './directives/header.directive';
import { MenuAsideToggleDirective } from './directives/menu-aside-toggle.directive';
import { QuickSidebarOffcanvasDirective } from './directives/quick-sidebar-offcanvas.directive';
import { QuickSearchDirective } from './directives/quick-search.directive';
import { ClipboardDirective } from './directives/clipboard.directive';
import { PortletDirective } from './directives/portlet.directive';

// Custom Pipes
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { TimeElapsedPipe } from './pipes/time-elapsed.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { GetObjectPipe } from './pipes/get-object.pipe';
import { ConsoleLogPipe } from './pipes/console-log.pipe';
import { SafePipe } from './pipes/safe.pipe';

// Custom Services
import { LayoutConfigService } from './services/layout-config.service';
import { LayoutConfigStorageService } from './services/layout-config-storage.service';
import { LayoutRefService } from './services/layout/layout-ref.service';
import { MenuConfigService } from './services/menu-config.service';
import { PageConfigService } from './services/page-config.service';
import { UserService } from './services/user.service';
import { UtilsService } from './services/utils.service';
import { ClassInitService } from './services/class-init.service';
import { MessengerService } from './services/messenger.service';
import { ClipboardService } from './services/clipboard.service';
import { LogsService } from './services/logs.service';
import { QuickSearchService } from './services/quick-search.service';
import { DataTableService } from './services/datatable.service';
import { SplashScreenService } from './services/splash-screen.service';
import { SubheaderService } from './services/layout/subheader.service';
import { HeaderService } from './services/layout/header.service';
import { MenuHorizontalService } from './services/layout/menu-horizontal.service';
import { MenuAsideService } from './services/layout/menu-aside.service';
import { TranslationService } from './services/translation.service';
import { AppFakeApiService } from './fake-api/app-fake-api.service';

// Vendors
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GestureConfig } from '@angular/material';
import 'hammerjs';
import { environment } from '@env/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  // suppressScrollX: true
};

@NgModule({
  imports: [CommonModule, environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(AppFakeApiService) : []],
  declarations: [
    // Directives
    MenuAsideDirective,
    MenuAsideOffcanvasDirective,
    MenuHorizontalOffcanvasDirective,
    MenuHorizontalDirective,
    ScrollTopDirective,
    HeaderDirective,
    MenuAsideToggleDirective,
    QuickSidebarOffcanvasDirective,
    QuickSearchDirective,
    ClipboardDirective,
    PortletDirective,

    // Pipes
    FirstLetterPipe,
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    ConsoleLogPipe,
    SafePipe
  ],
  exports: [
    // Directives
    MenuAsideDirective,
    MenuAsideOffcanvasDirective,
    MenuHorizontalOffcanvasDirective,
    MenuHorizontalDirective,
    ScrollTopDirective,
    HeaderDirective,
    MenuAsideToggleDirective,
    QuickSidebarOffcanvasDirective,
    QuickSearchDirective,
    ClipboardDirective,
    PortletDirective,

    // Pipes
    FirstLetterPipe,
    TimeElapsedPipe,
    JoinPipe,
    GetObjectPipe,
    ConsoleLogPipe,
    SafePipe
  ],
  providers: [
    TranslationService,
    LayoutConfigService,
    LayoutConfigStorageService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    UserService,
    UtilsService,
    ClassInitService,
    MessengerService,
    ClipboardService,
    LogsService,
    QuickSearchService,
    DataTableService,
    SplashScreenService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },

    // template services
    SubheaderService,
    HeaderService,
    MenuHorizontalService,
    MenuAsideService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    }
  ]
})
export class SharedModule {}
