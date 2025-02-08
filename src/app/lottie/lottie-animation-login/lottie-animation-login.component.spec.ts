import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieAnimationLoginComponent } from './lottie-animation-login.component';

describe('LottieAnimationLoginComponent', () => {
  let component: LottieAnimationLoginComponent;
  let fixture: ComponentFixture<LottieAnimationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LottieAnimationLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LottieAnimationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
