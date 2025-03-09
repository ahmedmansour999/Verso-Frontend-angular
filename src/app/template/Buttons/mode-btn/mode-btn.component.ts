import { Component } from '@angular/core';
import { ThemeService } from '../../../Class/theme.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mode-btn',
  imports: [ CommonModule , FormsModule],
  templateUrl: './mode-btn.component.html',
  styleUrl: './mode-btn.component.css' ,
  standalone : true
})
export class ModeBtnComponent {
  isDarkTheme: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.getTheme() === 'dark';
  }

  onToggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.getTheme() === 'dark';
  }

}
