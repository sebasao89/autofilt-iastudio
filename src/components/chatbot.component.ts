import {
  Component,
  signal,
  inject,
  ElementRef,
  ViewChild,
  effect,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AiService } from "../services/ai.service";
import { TranslationService } from "../services/translation.service";

@Component({
  selector: "app-chatbot",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <!-- Floating Trigger Button -->
    <button
      (click)="toggleChat()"
      class="fixed bottom-6 right-6 z-[60] flex items-center justify-center size-14 rounded-full bg-primary hover:bg-primary/90 text-background-dark shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all hover:scale-110 active:scale-95"
      [class.scale-0]="isOpen()"
      aria-label="Open AI Coach"
    >
      <span class="material-symbols-outlined text-3xl">smart_toy</span>
    </button>

    <!-- Chat Window -->
    <div
      class="fixed bottom-6 right-6 z-[60] w-[90vw] md:w-[400px] h-[600px] max-h-[85vh] bg-[#211d1b] rounded-2xl border border-[#4d423d] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right"
      [class.scale-0]="!isOpen()"
      [class.opacity-0]="!isOpen()"
      [class.scale-100]="isOpen()"
      [class.opacity-100]="isOpen()"
    >
      <!-- Header -->
      <div
        class="bg-[#2a2420] p-4 border-b border-[#4d423d] flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div
            class="size-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30"
          >
            <span class="material-symbols-outlined text-primary"
              >smart_toy</span
            >
          </div>
          <div>
            <h3 class="text-white font-bold">{{ ts.text().chat.title }}</h3>
            <p class="text-xs text-green-400 flex items-center gap-1">
              <span class="size-1.5 rounded-full bg-green-400"></span>
              {{ ts.text().chat.online }}
            </p>
          </div>
        </div>
        <button
          (click)="toggleChat()"
          class="text-text-muted hover:text-white transition-colors"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Messages Area -->
      <div
        #scrollContainer
        class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1a1716]"
      >
        @for (msg of messages(); track $index) {
        <div
          [class]="
            'flex ' + (msg.role === 'user' ? 'justify-end' : 'justify-start')
          "
        >
          <div
            [class]="
              'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ' +
              (msg.role === 'user'
                ? 'bg-primary text-background-dark font-medium rounded-tr-sm'
                : 'bg-[#332c29] text-gray-200 border border-[#4d423d] rounded-tl-sm')
            "
          >
            <p class="whitespace-pre-wrap">{{ msg.text }}</p>
          </div>
        </div>
        } @if (isLoading()) {
        <div class="flex justify-start">
          <div
            class="bg-[#332c29] px-4 py-3 rounded-2xl rounded-tl-sm border border-[#4d423d] flex gap-1"
          >
            <span
              class="size-2 rounded-full bg-primary/50 animate-bounce"
              style="animation-delay: 0ms"
            ></span>
            <span
              class="size-2 rounded-full bg-primary/50 animate-bounce"
              style="animation-delay: 150ms"
            ></span>
            <span
              class="size-2 rounded-full bg-primary/50 animate-bounce"
              style="animation-delay: 300ms"
            ></span>
          </div>
        </div>
        }
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-[#2a2420] border-t border-[#4d423d]">
        <form (submit)="sendMessage()" class="relative">
          <input
            type="text"
            [(ngModel)]="currentMessage"
            name="message"
            [placeholder]="ts.text().chat.placeholder"
            class="w-full bg-[#1a1716] border border-[#4d423d] rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder-gray-600"
            [disabled]="isLoading()"
          />
          <button
            type="submit"
            [disabled]="!currentMessage.trim() || isLoading()"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  `,
})
export class ChatbotComponent {
  private aiService = inject(AiService);
  ts = inject(TranslationService);

  isOpen = signal(false);
  isLoading = signal(false);
  messages = signal<{ role: "user" | "model"; text: string }[]>([]);
  currentMessage = "";

  @ViewChild("scrollContainer") private scrollContainer!: ElementRef;

  constructor() {
    // Effect to update initial message when language changes or init
    effect(
      () => {
        // Reset or set initial message based on current lang if empty or just one init message
        if (this.messages().length === 0) {
          this.messages.set([
            { role: "model", text: this.ts.text().chat.initial },
          ]);
        }
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.messages(); // Dependency
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  toggleChat() {
    this.isOpen.update((v) => !v);
  }

  async sendMessage() {
    if (!this.currentMessage.trim() || this.isLoading()) return;

    const userMsg = this.currentMessage;
    this.currentMessage = "";

    // Add user message
    this.messages.update((msgs) => [...msgs, { role: "user", text: userMsg }]);
    this.isLoading.set(true);

    // Prepare history for API
    const history = this.messages()
      .slice(0, -1)
      .map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

    // Call AI with language context
    const response = await this.aiService.chat(
      userMsg,
      history,
      this.ts.currentLang()
    );

    this.messages.update((msgs) => [
      ...msgs,
      { role: "model", text: response || "Sorry, I missed that." },
    ]);
    this.isLoading.set(false);
  }

  scrollToBottom() {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}
