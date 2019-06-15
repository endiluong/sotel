import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { filter } from 'rxjs/operators';
import * as objectPath from 'object-path';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';



// language list
import { locale as enLang } from './shared/config/i18n/en';
import { locale as chLang } from './shared/config/i18n/ch';
import { locale as esLang } from './shared/config/i18n/es';
import { locale as jpLang } from './shared/config/i18n/jp';
import { locale as deLang } from './shared/config/i18n/de';
import { locale as frLang } from './shared/config/i18n/fr';

// Services
// tslint:disable-next-line:max-line-length
import { LayoutConfigService, ClassInitService, TranslationService, PageConfigService, SplashScreenService} from './shared';




// LIST KNOWN ISSUES
// [Violation] Added non-passive event listener; https://github.com/angular/angular/issues/8866

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[m-root]',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Metronic';

  @HostBinding('style') style: any;
  @HostBinding('class') classes: any = '';

  @ViewChild('splashScreen', { read: ElementRef })
  splashScreen: ElementRef;
  splashScreenImage: string;

  constructor(
    private layoutConfigService: LayoutConfigService,
    private classInitService: ClassInitService,
    private sanitizer: DomSanitizer,
    private translationService: TranslationService,
    private router: Router,
    private pageConfigService: PageConfigService,
    private splashScreenService: SplashScreenService,
  ) {
    // subscribe to class update event
    this.classInitService.onClassesUpdated$.subscribe((classes: any) => {
      // get body class array, join as string classes and pass to host binding class
      setTimeout(() => (this.classes = classes.body.join(' ')));
    });

    this.layoutConfigService.onLayoutConfigUpdated$.subscribe((model: any) => {
      this.classInitService.setConfig(model);

      this.style = '';
      if (objectPath.get(model.config, 'self.layout') === 'boxed') {
        const backgroundImage = objectPath.get(model.config, 'self.background');
        if (backgroundImage) {
          this.style = this.sanitizer.bypassSecurityTrustStyle(
            'background-image: url(' + objectPath.get(model.config, 'self.background') + ')'
          );
        }
      }

      // splash screen image
      this.splashScreenImage = objectPath.get(model.config, 'loader.image');
    });

    // register translations
    this.translationService.loadTranslations(enLang, chLang, esLang, jpLang, deLang, frLang);

    // override config by router change from pages config
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.layoutConfigService.setModel(
        { page: objectPath.get(this.pageConfigService.getCurrentPageConfig(), 'config') },
        true
      );
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.splashScreen) {
      this.splashScreenService.init(this.splashScreen.nativeElement);
    }
  }
}
