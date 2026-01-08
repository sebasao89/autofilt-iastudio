import { Component, signal, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-session',
  standalone: true,
  template: `
    <div class="bg-background-light dark:bg-background-dark font-display text-stone-800 dark:text-stone-200 antialiased overflow-x-hidden min-h-screen flex flex-col">
      <!-- Top Bar -->
      <header class="sticky top-0 z-40 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#4d423d] bg-white/95 dark:bg-[#3e2723]/95 backdrop-blur-md px-6 py-3 lg:px-10 shadow-sm">
        <div class="flex items-center gap-4">
          <h2 class="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">{{ ts.text().session.active }}</h2>
        </div>
        <div class="flex items-center gap-4">
          <button (click)="exit()" class="group flex items-center justify-center gap-2 rounded-lg bg-slate-100 dark:bg-[#332c29] border border-slate-300 dark:border-[#4d423d] hover:border-primary-orange/50 hover:bg-slate-200 dark:hover:bg-[#3e2723] transition-all h-9 px-4 text-slate-900 dark:text-white text-sm font-bold shadow-sm cursor-pointer">
            <span class="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>{{ ts.text().session.exit }}</span>
          </button>
        </div>
      </header>

      <main class="flex-1 w-full max-w-[1440px] mx-auto p-4 lg:p-8">
        <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="inline-flex items-center rounded-full bg-primary-orange/10 px-2.5 py-0.5 text-xs font-medium text-primary-orange border border-primary-orange/20">
                {{ ts.text().session.guided_tag }}
              </span>
              <span class="text-stone-500 text-sm font-body">{{ ts.text().session.step_count }}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-[#fbbf24] mb-2">{{ ts.text().session.title }}</h1>
            <p class="text-stone-600 dark:text-stone-400 font-body max-w-2xl">{{ ts.text().session.desc }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div class="lg:col-span-2 flex flex-col gap-6">
            <!-- Video Player -->
            <div class="relative w-full aspect-video bg-[#2a1e1b] rounded-xl overflow-hidden shadow-xl ring-1 ring-[#4d423d] group">
              <div class="absolute inset-0 bg-cover bg-center opacity-70" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPls6gLi0fZo792iFOja2z9V3ti7sbeRG1FEHlaveOxGVtBB7fnC3XA6OT9GpvqDPRIQ963RWHBZlkULG4WOvLFkqMNQPCvs1wa2nLGEpx7kE1Py43o95nK-_-RJJIdRI5W_Uyeb9sBGBJxTes9u8O33yhDPNuI1L0FQJQOOBhJCRcyHyNAlz0gU7z7wHDE9aS9xUXpC27qXYKtCY5XMQxfikJ_74nQfONRaU16280CxGyp8J24ZiYVEvB0g0GEwDwn1mKF2_Kgaqq')"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#2a1e1b]/95 via-[#2a1e1b]/30 to-[#2a1e1b]/40"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <button (click)="togglePlay()" class="flex items-center justify-center rounded-full size-20 bg-primary-orange/90 hover:bg-primary-orange text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(194,65,12,0.5)] pl-1 cursor-pointer">
                  <span class="material-symbols-outlined text-5xl">{{ isPlaying() ? 'pause' : 'play_arrow' }}</span>
                </button>
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4 pb-5 flex flex-col gap-2">
                <div class="w-full bg-white/20 h-1.5 rounded-full cursor-pointer relative group/progress">
                  <div class="absolute h-full bg-primary-orange rounded-full transition-all duration-300" [style.width.%]="progress()"></div>
                  <div class="absolute top-1/2 -translate-y-1/2 size-3 bg-white rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow-lg" [style.left.%]="progress()"></div>
                </div>
                <div class="flex items-center justify-between text-white mt-1">
                  <span class="text-xs font-mono font-medium">04:12 / 12:30</span>
                  <div class="flex items-center gap-4">
                    <button class="hover:text-primary-orange transition-colors"><span class="material-symbols-outlined">replay_10</span></button>
                    <button class="hover:text-primary-orange transition-colors"><span class="material-symbols-outlined">speed</span></button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white dark:bg-[#332c29] border border-slate-200 dark:border-[#4d423d] rounded-xl p-5 shadow-sm">
                <h3 class="text-slate-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-orange">handyman</span>
                  {{ ts.text().session.tools }}
                </h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3 p-2 rounded-lg bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/5">
                    <div class="size-10 rounded-md bg-[#3e2723] flex items-center justify-center text-primary-orange border border-white/10">
                      <span class="material-symbols-outlined">local_cafe</span>
                    </div>
                    <div>
                      <p class="text-slate-900 dark:text-white font-medium text-sm">{{ ts.text().session.tool_cup }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-white dark:bg-[#332c29] border border-slate-200 dark:border-[#4d423d] rounded-xl p-5 shadow-sm">
                <h3 class="text-slate-900 dark:text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-primary-orange">verified</span>
                  {{ ts.text().session.goals }}
                </h3>
                <div class="flex flex-wrap gap-2">
                  <div class="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-black/20 px-3 py-1.5 border border-transparent hover:border-primary-orange/30 transition-colors">
                    <span class="material-symbols-outlined text-primary-orange text-[18px]">water_drop</span>
                    <span class="text-slate-700 dark:text-gray-200 text-xs font-medium">{{ ts.text().session.goal_1 }}</span>
                  </div>
                  <div class="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-black/20 px-3 py-1.5 border border-transparent hover:border-primary-orange/30 transition-colors">
                    <span class="material-symbols-outlined text-primary-orange text-[18px]">fitbit</span>
                    <span class="text-slate-700 dark:text-gray-200 text-xs font-medium">{{ ts.text().session.goal_2 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside class="flex flex-col gap-6">
            <div class="bg-white dark:bg-[#332c29] border border-slate-200 dark:border-[#4d423d] rounded-xl overflow-hidden flex flex-col max-h-[500px] shadow-sm">
              <div class="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#3e2723]">
                <h3 class="text-slate-900 dark:text-white font-bold text-lg">{{ ts.text().session.steps_title }}</h3>
                <div class="w-full bg-slate-300 dark:bg-white/20 h-1 mt-3 rounded-full overflow-hidden">
                  <div class="bg-primary-orange h-full w-[37.5%]"></div>
                </div>
                <p class="text-xs text-slate-500 dark:text-gray-400 mt-1 text-right">37% {{ ts.text().session.complete }}</p>
              </div>
              <div class="overflow-y-auto p-2 space-y-1">
                <div class="flex items-center gap-3 p-3 rounded-lg opacity-50 hover:opacity-70 transition-opacity cursor-default">
                  <span class="material-symbols-outlined text-primary-orange">check_circle</span>
                  <span class="text-slate-500 dark:text-gray-300 text-sm line-through">{{ ts.text().session.s1 }}</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg opacity-50 hover:opacity-70 transition-opacity cursor-default">
                  <span class="material-symbols-outlined text-primary-orange">check_circle</span>
                  <span class="text-slate-500 dark:text-gray-300 text-sm line-through">{{ ts.text().session.s2 }}</span>
                </div>
                <div class="relative flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-black/20 border border-primary-orange/40 shadow-sm">
                  <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary-orange rounded-l-lg"></div>
                  <div class="size-6 rounded-full border-2 border-primary-orange border-t-transparent animate-spin"></div>
                  <div class="flex-1">
                    <p class="text-slate-900 dark:text-white text-sm font-bold">{{ ts.text().session.s3 }}</p>
                    <p class="text-primary-orange text-xs font-medium mt-0.5">{{ ts.text().session.s3_status }}</p>
                  </div>
                  <span class="material-symbols-outlined text-primary-orange dark:text-white animate-pulse">equalizer</span>
                </div>
                <div class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                  <div class="size-5 rounded-full border-2 border-slate-400 dark:border-gray-500"></div>
                  <span class="text-slate-500 dark:text-gray-400 text-sm">{{ ts.text().session.s4 }}</span>
                </div>
              </div>
            </div>
            
            <div class="bg-[#F4F7F0] border border-[#556B2F]/30 rounded-xl p-4 flex gap-3 items-start shadow-sm">
              <span class="material-symbols-outlined text-[#556B2F] shrink-0">info</span>
              <div>
                <h4 class="text-stone-800 text-sm font-bold mb-1">{{ ts.text().session.flow_title }}</h4>
                <p class="text-stone-600 text-xs leading-relaxed">
                  {{ ts.text().session.flow_desc }}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  `
})
export class SessionComponent implements OnDestroy {
  ts = inject(TranslationService);
  isPlaying = signal(false);
  progress = signal(35);
  private intervalId: any;

  constructor(private router: Router) {}

  togglePlay() {
    this.isPlaying.update(p => !p);
    if (this.isPlaying()) {
      this.intervalId = setInterval(() => {
        this.progress.update(p => p >= 100 ? 0 : p + 0.5);
      }, 500);
    } else {
      clearInterval(this.intervalId);
    }
  }

  exit() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
