import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Sub Modules
import { SharedModule } from '@app/shared';

// Components
import { ListTimelineComponent } from './list-timeline.component';
import { TimelineItemComponent } from './timeline-item/timeline-item.component';

@NgModule({
  imports: [
    CommonModule,

    SharedModule
  ],
  declarations: [ListTimelineComponent, TimelineItemComponent],
  exports: [ListTimelineComponent, TimelineItemComponent]
})
export class ListTimelineModule {}
