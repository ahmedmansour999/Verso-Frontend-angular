import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  SimpleChanges,
  viewChild,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../Api/lang/language.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [TranslateModule, CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  standalone: true,
})
export class WelcomeComponent {
  lang: string = 'en';
  subscription: Subscription = new Subscription();

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.languageService.lang$.subscribe((lang) => {
      this.lang = lang;
    });

    this.lang = this.languageService.getLang();
  }

  // @ViewChild('modal') modalElement : any;
  // navigate(dir: string) {
  //   this.modalElement.nativeElement.setAttribute('aria-label', 'Close');
  //   const val = dir === 'portfolio' ? '/portfolio' : '/upace/company';
  //   this.router.navigate([val]);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
