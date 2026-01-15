import {
  Component,
  inject,
  computed,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Router, RouterOutlet, NavigationEnd } from "@angular/router";
import { SidebarComponent } from "./components/sidebar.component";
import { ChatbotComponent } from "./components/chatbot.component";
import { toSignal } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";

@Component({
  selector: "app-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SidebarComponent, ChatbotComponent],
  template: `
    <div class="flex min-h-screen bg-background-light dark:bg-background-dark">
      @if (!isLoginPage()) {
      <!-- Fixed Sidebar for desktop -->
      <app-sidebar />
      }

      <!-- Main Content Area -->
      <!-- Added left margin for desktop to offset fixed sidebar -->
      <div [class]="isLoginPage() ? 'flex-1 w-full' : 'flex-1 lg:ml-72 w-full'">
        <router-outlet></router-outlet>
      </div>

      @if (!isLoginPage()) {
      <!-- AI Chatbot Overlay -->
      <app-chatbot />
      }
    </div>
  `,
})
export class AppComponent {
  private router = inject(Router);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  isLoginPage = computed(() => {
    const url = this.currentUrl();
    return url === "/" || url === "" || url === "/#/" || url === "/#";
  });
}
