import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-galary',
  imports: [],
  templateUrl: './galary.component.html',
  styleUrl: './galary.component.css',
})
export class GalaryComponent {
  @ViewChildren('cardWidth') cardElements!: QueryList<ElementRef>;
  currentIndex = 0;
  cardWidth: number = 0;
  translateX = 0;
  rightDisable: boolean = false;
  leftDisable: boolean = true;

  user_details = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    education: [
      {
        id: 1,
        title: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        start_at: '2024',
        end_at: 'now',
      },
    ],
    experience: [
      {
        id: 1,
        title: 'Software Engineer',
        company: 'ABC Company',
        start_at: '2024',
        end_at: 'now',
      },
    ],
    images: [
      {
        id: 1,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 2,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 13,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 14,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 15,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 16,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
      {
        id: 17,
        title: 'Eccomerce Image',
        image:
          'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9iaWxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D',
      },
    ],
  };

  public get images() {
    return this.user_details.images;
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
    this.rightDisable = this.currentIndex + 3 >= this.images.length;
  }

  onResize(): void {
    this.updateCardWidth();
    this.translateX = -this.currentIndex * this.cardWidth;
    this.updateButtonStates();
  }
}
