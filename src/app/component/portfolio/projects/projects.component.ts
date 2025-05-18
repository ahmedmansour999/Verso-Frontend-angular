import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
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

interface IColumn {
  id: number;
  cards: Iprojects[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  @ViewChildren('cardWidth') cardElements!: QueryList<ElementRef>;
  currentIndex = 0;
  cardWidth: number = 0;
  columnWidth: number = 0;
  containerWidth: number = 0;
  visibleColumns: number = 2; // Default to 2 columns
  translateX = 0;
  rightDisable: boolean = false;
  leftDisable: boolean = true;
  baseUrl = environment.baseUrl;
  readonly gap: number = 15; // 15px gap between columns

  slides: Iprojects[] = [];
  groupedSlides: IColumn[] = [];

  constructor(
    private _userService: UserService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this._userService.currentUser().subscribe((data) => {
      this.slides = data.portfolio.projects;
      this.groupSlides();
      this.updateLayout();
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.updateLayout();
    this.cardElements.changes.subscribe(() => {
      this.updateLayout();
    });
  }

  private groupSlides(): void {
    this.groupedSlides = [];
    for (let i = 0; i < this.slides.length; i += 2) {
      const columnCards = this.slides.slice(i, i + 2);
      if (columnCards.length > 0) {
        this.groupedSlides.push({
          id: i / 2,
          cards: columnCards,
        });
      }
    }
  }

  private updateLayout(): void {
    if (this.cardElements.length > 0) {
      const firstCard = this.cardElements.first.nativeElement;
      this.cardWidth = firstCard.getBoundingClientRect().width;
      const container = this.el.nativeElement.querySelector(
        '.projects_container'
      );
      this.containerWidth = container.getBoundingClientRect().width;
      this.columnWidth = this.cardWidth + this.gap; // Include 15px gap
      this.visibleColumns = Math.floor(this.containerWidth / this.columnWidth);
      this.visibleColumns = Math.min(2, Math.max(1, this.visibleColumns)); // 1 or 2 columns
      this.updateButtonStates();
      this.updateTranslateX();
    }
  }

  right(): void {
    if (!this.rightDisable) {
      this.currentIndex += this.visibleColumns;
      this.updateTranslateX();
      this.updateButtonStates();
    }
  }

  left(): void {
    if (!this.leftDisable) {
      this.currentIndex -= this.visibleColumns;
      this.currentIndex = Math.max(0, this.currentIndex);
      this.updateTranslateX();
      this.updateButtonStates();
    }
  }

  private updateTranslateX(): void {
    this.translateX = -this.currentIndex * this.columnWidth;
    this.cdr.markForCheck();
  }

  private updateButtonStates(): void {
    this.leftDisable = this.currentIndex <= 0;
    this.rightDisable =
      this.currentIndex + this.visibleColumns >= this.groupedSlides.length;
    this.cdr.markForCheck();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateLayout();
  }
}
