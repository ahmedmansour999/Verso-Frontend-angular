import { LoadingService } from './../../../Api/Loading/loading.service';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent {
  isLoading: boolean = false;
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
