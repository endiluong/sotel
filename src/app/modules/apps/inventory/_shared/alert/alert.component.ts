import { Component, Inject, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'm-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  @Input() type: 'primary | accent | warn';
  @Input() duration = 0;
  @Input() showCloseButton = true;
  @Output() close = new EventEmitter<boolean>();

  alertShowing = true;

  ngOnInit() {
    if (this.duration === 0) {
      return;
    }

    setTimeout(() => {
      this.closeAlert();
    }, this.duration);
  }

  closeAlert() {
    this.close.emit();
  }
}
