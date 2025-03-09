import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from "./template/Loading-spinner/loading-spinner/loading-spinner.component";
import { LangBtnComponent } from "./template/Buttons/lang-btn/lang-btn.component";
import { ModeBtnComponent } from "./template/Buttons/mode-btn/mode-btn.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'verso';
}
