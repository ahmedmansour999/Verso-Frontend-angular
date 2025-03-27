import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';

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

  slides = [
    {
      id: 1,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 1',
    },
    {
      id: 2,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 2',
    },
    {
      id: 3,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 3',
    },
    {
      id: 4,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 4',
    },
    {
      id: 5,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 5',
    },
    {
      id: 6,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 6',
    },
    {
      id: 7,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 7',
    },
    {
      id: 8,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 8',
    },
    {
      id: 9,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 9',
    },
    {
      id: 10,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 10',
    },
    {
      id: 11,
      image:
        'https://www.shutterstock.com/shutterstock/photos/2264278429/display_1500/stock-photo-project-management-project-managers-streamline-tasks-and-progress-progress-planning-with-company-2264278429.jpg',
      smallDesc: 'SCO',
      link:"http//github.com",
      title: 'Card 11',
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

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
