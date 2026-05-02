import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {

  @ViewChild('slider') slider!: ElementRef;

  scrollRight() {
    this.slider.nativeElement.scrollBy({
      left: 400,
      behavior: 'smooth'
    });
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({
      left: -400,
      behavior: 'smooth'
    });
  }
}