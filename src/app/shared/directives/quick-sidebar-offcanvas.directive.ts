import { Directive, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[mQuickSidebarOffcanvas]'
})
export class QuickSidebarOffcanvasDirective implements AfterViewInit, OnDestroy {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const offcanvas = new mOffcanvas(this.el.nativeElement, {
      overlay: true,
      baseClass: 'm-quick-sidebar',
      closeBy: 'm_quick_sidebar_close',
      toggleBy: 'm_quick_sidebar_toggle'
    });
  }
  ngOnDestroy(): void {}
}
