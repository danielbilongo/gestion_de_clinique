import { Component } from '@angular/core';
import { SidebarComponent } from "../../sidebar/sidebar/sidebar.component";
import { AppHeaderComponent } from "../../components/app-header/app-header.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [SidebarComponent, AppHeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
