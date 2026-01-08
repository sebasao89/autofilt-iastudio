import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar.component';
import { ChatbotComponent } from './components/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ChatbotComponent],
  template: `
    <div class="flex min-h-screen bg-background-light dark:bg-background-dark">
      <!-- Fixed Sidebar for desktop -->
      <app-sidebar />
      
      <!-- Main Content Area -->
      <!-- Added left margin for desktop to offset fixed sidebar -->
      <div class="flex-1 lg:ml-72 w-full">
        <router-outlet></router-outlet>
      </div>

      <!-- AI Chatbot Overlay -->
      <app-chatbot />
    </div>
  `
})
export class AppComponent {}