import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Vendors
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Sub Modules
import { LayoutModule } from './layout/layout.module';
import { PartialsModule } from '@app/shared/components/partials/partials.module';

// Components
import { ShellComponent } from './shell.component';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule,

    LayoutModule,
    PartialsModule,
    SharedModule
  ],
  declarations: [
    ShellComponent,
    ErrorPageComponent
  ]
})
export class ShellModule {
}
