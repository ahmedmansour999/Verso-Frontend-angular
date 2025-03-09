import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../Api/lang/language.service';

@Component({
  selector: 'app-welcome',
  imports: [TranslateModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  standalone: true,
})
export class WelcomeComponent {
  lang: string = 'en';
  subscription: Subscription = new Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.subscription = this.languageService.lang$.subscribe((lang) => {
      this.lang = lang;
    });
    this.lang = this.languageService.getLang();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
