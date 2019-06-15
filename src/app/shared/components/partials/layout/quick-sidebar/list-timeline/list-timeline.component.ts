import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

// Services
import { LogData } from '@app/shared/interfaces/log-data';
import { LogsService } from '@app/shared';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-list-timeline',
  templateUrl: './list-timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListTimelineComponent implements OnInit {
  @Input() type: any;
  @Input() heading: any;

  @Input() logList: Observable<LogData[]>;

  constructor(private logsService: LogsService) {}

  ngOnInit() {
    // call logs to http api
    // this.logList = this.logsService.getData({ types: this.type });
  }
}
