import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UserService } from '../../../Api/user/user.service';
import { environment } from '../../../../environments/environment';

interface Iprojects {
  id: number;
  title: string;
  short_description: string;
  description: string;
  link: string;
  image: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  @ViewChildren('cardWidth') cardElements!: QueryList<ElementRef>;
  currentIndex = 0;
  cardWidth: number = 0;
  translateX = 0;
  rightDisable: boolean = false;
  leftDisable: boolean = true;
  baseUrl = environment.baseUrl

  slides: Iprojects[] = [
    {
      id: 0,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      short_description: '',
      description: '',
      link: '',
      title: '',
    },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    private _userService: UserService
  ) {
    _userService.fetchUserData().subscribe((data) => {
      this.slides  = data.portfolio.projects ;
    });
  }

  ngAfterViewInit(): void {
    this.updateCardWidth();
    this.updateButtonStates();
    this.cardElements.changes.subscribe(() => {
      this.updateCardWidth();
    });
  }

  private updateCardWidth(): void {
    if (this.cardElements.length > 0) {
      this.cardWidth =
        this.cardElements.first.nativeElement.getBoundingClientRect().width;
      this.cdr.detectChanges();
    }
  }

  right(): void {
    if (!this.rightDisable) {
      this.currentIndex += 1;
      this.translateX = -this.currentIndex * this.cardWidth;
      this.updateButtonStates();
    }
  }

  left(): void {
    if (!this.leftDisable) {
      this.currentIndex -= 1;
      this.translateX = -this.currentIndex * this.cardWidth;
      this.updateButtonStates();
    }
  }

  private updateButtonStates(): void {
    this.leftDisable = this.currentIndex <= 0;
    this.rightDisable = this.currentIndex + 6 >= this.slides.length;
    this.cdr.detectChanges();
  }

  onResize(): void {
    this.updateCardWidth();
    this.translateX = -this.currentIndex * this.cardWidth;
    this.updateButtonStates();
  }
}
