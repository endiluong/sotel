import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Vendors
import { AngularEditorModule } from '@kolkov/angular-editor';

// Sub Modules
import { SharedModule } from '@app/shared';
import { PartialsModule } from '@app/shared/components/partials/partials.module';

// Components
import { ActionComponent } from './action.component';
import { ActionRoutingModule } from './action.routing';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AngularEditorModule,

    PartialsModule,
    SharedModule,

    ActionRoutingModule
  ],
  declarations: [
    ActionComponent
  ]
})
export class ActionModule { }
