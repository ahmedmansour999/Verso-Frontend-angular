import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-lottie-animation-login',
  imports: [LottieComponent],
  templateUrl: './lottie-animation-login.component.html',
  styleUrl: './lottie-animation-login.component.css',
})
export class LottieAnimationLoginComponent {
  private animationItem: AnimationItem | undefined;

  options: AnimationOptions = {
    path: './media/lottie/login/Animation - 1738088386612.json',
    loop: true,
    autoplay: true,
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }


}
