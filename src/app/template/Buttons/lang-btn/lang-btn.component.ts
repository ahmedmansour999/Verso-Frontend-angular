import { LanguageService } from './../../../Api/lang/language.service';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lang-btn',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './lang-btn.component.html',
  styleUrls: ['./lang-btn.component.css'],
})
export class LangBtnComponent implements OnInit, OnDestroy {
  currentLang: string = 'en';
  subscription!: Subscription;

  constructor(
    private translate: TranslateService,
    private _LanguageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.subscription = this._LanguageService.lang$.subscribe((lang) => {
      this.currentLang = lang;
      this.translate.use(lang);
      this.setDocumentDirection(lang);
    });

    this.currentLang = this._LanguageService.getLang();
    this.translate.use(this.currentLang);
    this.translate.setDefaultLang('en');
    this.setDocumentDirection(this.currentLang);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleLanguage(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const lang = isChecked ? 'ar' : 'en';

    this.currentLang = lang;
    this.translate.use(lang);
    this._LanguageService.setLang(lang);
    this.setDocumentDirection(lang);
  }

  private setDocumentDirection(lang: string): void {
    if (lang === 'ar') {
      document.body.setAttribute('dir', 'rtl');
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-english');
    } else {
      document.body.setAttribute('dir', 'ltr');
      document.body.classList.remove('font-arabic');
      document.body.classList.add('font-english');
    }
  }
}
