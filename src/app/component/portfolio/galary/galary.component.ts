import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  leftDisable: boolean = false;
  baseUrl = environment.baseUrl ;

  certificationsData: ICertification[] = [
    {
      id: 1,
      image: '',
      title: '',
      link: '',
    }
  ];
  constructor(private _userService : UserService){
    _userService.fetchUserData().subscribe((data)=>{
      this.certificationsData = data.portfolio.certifications ;
    })
  }

  public get certifications() {
    return this.certificationsData;
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
    this.rightDisable = this.currentIndex + 3 >= this.certificationsData.length;
  }

  onResize(): void {
    this.updateCardWidth();
    this.translateX = -this.currentIndex * this.cardWidth;
    this.updateButtonStates();
  }
}
