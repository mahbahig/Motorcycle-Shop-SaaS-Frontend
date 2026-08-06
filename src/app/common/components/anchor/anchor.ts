import { Component, input } from '@angular/core';

@Component({
  selector: 'app-anchor',
  imports: [],
  templateUrl: './anchor.html',
  styleUrl: './anchor.css',
})
export class Anchor {
  message = input('اضغط هنا');
}
