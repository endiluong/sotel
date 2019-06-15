import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Sub Modules
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ShellModule } from './shell/shell.module';

// Components
import { AppComponent } from './app.component';

// Routing
import { AppRoutingModule } from './app.routing';

// Vendors
import { NgxPermissionsModule } from 'ngx-permissions';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material';

import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import { environment } from '@env/environment';

// ADAL
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { PartialsModule } from './shared/components/partials/partials.module';

export function hljsLanguages() {
  return [{ name: 'typescript', func: typescript }];
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // Routing
    AppRoutingModule, // must be imported as the last module as it contains the fallback route

    CoreModule,
    SharedModule,
    ShellModule,

    // Vendors
    TranslateModule.forRoot(),
    NgbModule,
    OverlayModule,
    NgxPermissionsModule.forRoot(),
    NgbModule.forRoot(),
    MatProgressSpinnerModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),

    // ADAL
    MsAdalAngular6Module.forRoot({
      tenant: '6c2f2f98-490f-47c6-b0cb-68850c68f2d6',
      // clientId: '55337d42-c4e0-4937-aaa4-5fe25933e55a',
      clientId: 'ccb27d58-9455-4733-ba79-55c4f4e3c3b0',
      redirectUri: 'http://localhost:4200',
      endpoints: {},
      navigateToLoginRequestUrl: false,
      cacheLocation: '<localStorage / sessionStorage>'
    })
  ],
  declarations: [AppComponent],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
