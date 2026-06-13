import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '@common/components/side-bar/side-bar';
import { Navbar } from '@common/components/navbar/navbar';
import { UserService } from '@core/services';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-main-layout',
  imports: [RouterOutlet, SideBar, Navbar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  private readonly userService = inject(UserService);

  sidebarHidden: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {}
  closeSidebar() {
    this.sidebarHidden.set(true);
  }
}

