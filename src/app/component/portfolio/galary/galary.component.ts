import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UserService } from '../../../Api/user/user.service';
import { environment } from '../../../../environments/environment';

interface ICertification {
  id: number;
  image: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-galary',
  templateUrl: './galary.component.html',
  styleUrls: ['./galary.component.css'],
})
export class GalaryComponent {
  @ViewChildren('cardWidth') cardElements!: QueryList<ElementRef>;
  currentIndex = 0;
  cardWidth: number = 0;
  translateX = 0;
  rightDisable: boolean = true;
  leftDisable: boolean = true;
  baseUrl = environment.baseUrl;
  isLoading: boolean = true;
  visibleCards: number = 4; // Default number of visible cards

  certificationsData: ICertification[] = [];

  constructor(
    private _userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCertifications();
    this.calculateVisibleCards();
  }

  private loadCertifications(): void {
    this.isLoading = true;
    this._userService.currentUser().subscribe({
      next: (data) => {
        this.certificationsData = data.portfolio?.certifications || [];
        this.updateButtonStates();
      },
      error: (err) => {
        console.error('Failed to load certifications:', err);
        this.certificationsData = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.isLoading = false;
        this.updateCardWidth();
        this.calculateVisibleCards();
        this.cdr.detectChanges();
      },
    });
  }

  trackById(index: number, item: ICertification): number {
    return item.id || index;
  }

  private updateCardWidth(): void {
    if (this.cardElements?.length > 0) {
      const element = this.cardElements.first.nativeElement;
      const style = window.getComputedStyle(element);
      this.cardWidth =
        element.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight);
    }
  }

  private calculateVisibleCards(): void {
    const containerWidth = this.getContainerWidth();
    if (containerWidth > 0 && this.cardWidth > 0) {
      this.visibleCards = Math.floor(containerWidth / this.cardWidth);
    }
  }

  right(): void {
    if (!this.rightDisable) {
      this.currentIndex = Math.min(
        this.currentIndex + this.visibleCards,
        this.certificationsData.length - this.visibleCards
      );
      this.updateSliderPosition();
    }
  }

  left(): void {
    if (!this.leftDisable) {
      this.currentIndex = Math.max(0, this.currentIndex - this.visibleCards);
      this.updateSliderPosition();
    }
  }

  private updateSliderPosition(): void {
    this.translateX = -this.currentIndex * this.cardWidth;
    this.updateButtonStates();
  }

  private updateButtonStates(): void {
    this.leftDisable = this.currentIndex <= 0;
    this.rightDisable = this.currentIndex + this.visibleCards >= this.certificationsData.length;
  }

  private getContainerWidth(): number {
    if (this.cardElements?.length > 0) {
      return this.cardElements.first.nativeElement.parentElement.offsetWidth;
    }
    return 0;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateCardWidth();
    this.calculateVisibleCards();
    this.updateSliderPosition();
  }
}
