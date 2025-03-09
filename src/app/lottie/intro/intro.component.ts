import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {
  private animationItem: AnimationItem | undefined;

  options: AnimationOptions = {
    path: './media/lottie/login/Animation - 1739705719656.json',
    loop: false ,
    autoplay: true ,
  };

  constructor(private _Router: Router) {}

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;

    animationItem.addEventListener('complete', () => {
      this._Router.navigate(['/homePage']);
    });

  }
}
