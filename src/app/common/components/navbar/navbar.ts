import { Component, model, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
})
export class Navbar implements OnInit {
  sidebarHidden = model<boolean>(true);
  dateAr: WritableSignal<string> = signal('');

  ngOnInit() {
    const today = new Date();

    this.dateAr.set(
      today.toLocaleDateString('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    );
  }
  openSidebar(): void {
    this.sidebarHidden.set(false);
  }
}
