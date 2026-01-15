import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { TranslationService } from "../services/translation.service";

@Component({
  selector: "app-dashboard",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex-1 flex flex-col h-screen overflow-y-auto relative scroll-smooth bg-background-light dark:bg-background-dark text-slate-900 dark:text-white pb-20 lg:pb-0"
    >
      <header class="w-full px-6 py-8 md:px-10">
        <div
          class="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div class="flex flex-col gap-1">
            <h1
              class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              {{ ts.text().dashboard.welcome }}
            </h1>
            <p class="text-slate-600 dark:text-text-muted text-lg font-light">
              {{ ts.text().dashboard.subtitle }}
            </p>
          </div>
          <div
            class="flex items-center gap-3 bg-white dark:bg-card-dark px-4 py-2 rounded-full border border-slate-200 dark:border-[#4d423d] shadow-sm"
          >
            <span class="relative flex h-3 w-3">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-3 w-3 bg-teal-500"
              ></span>
            </span>
            <span class="text-slate-800 dark:text-white text-sm font-medium">{{
              ts.text().dashboard.system_online
            }}</span>
          </div>
        </div>
      </header>

      <div class="flex-1 px-6 pb-12 md:px-10">
        <div class="max-w-[1200px] mx-auto flex flex-col gap-8">
          <!-- Hero Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Next Up Card -->
            <div
              class="lg:col-span-2 group relative overflow-hidden rounded-2xl bg-black dark:bg-card-dark border border-slate-200 dark:border-[#4d423d] shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"
              ></div>
              <div
                class="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-primary text-sm"
                  >schedule</span
                >
                <span class="text-white text-xs font-bold tracking-wide"
                  >25 MIN</span
                >
              </div>
              <div
                class="h-[300px] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBTiq-XZWMWgupjJSEc76YowNgpUYcd-pIkVXcjsj_Z1T52gwoSp4FMC3x0710oaY4x1syTX908HimNWDCu6dMCC29dXfs1k5bwGESY7cSbWjY_yVW_OCwOEMvTgRY3zU-dMFm8qMYnx8A6STT06KO6aqV_9zaCvZ5rL9TRl4cTVQHrlG0zNJBDECloVclfEoZB2UCuMgJQHfxOSvsMNGgZHgW5HFTxyJVJ60Bw8llkZbLsKP-sGwEDem6UZLebND_owtdinqrn9Ygj')"
              ></div>
              <div
                class="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col md:flex-row items-end justify-between gap-4"
              >
                <div class="flex flex-col gap-2 max-w-lg">
                  <div
                    class="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider"
                  >
                    <span class="material-symbols-outlined text-base"
                      >play_circle</span
                    >
                    {{ ts.text().dashboard.next_up }}
                  </div>
                  <h2
                    class="text-white text-2xl md:text-3xl font-bold leading-tight"
                  >
                    {{ ts.text().dashboard.card_title }}
                  </h2>
                  <p class="text-gray-300 text-sm md:text-base font-light">
                    {{ ts.text().dashboard.card_desc }}
                  </p>
                </div>
                <button
                  (click)="navigateTo('session')"
                  class="flex shrink-0 items-center justify-center gap-2 rounded-xl h-12 px-6 bg-primary hover:bg-primary/90 text-background-dark font-bold transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] cursor-pointer"
                >
                  <span>{{ ts.text().dashboard.start_btn }}</span>
                  <span class="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>

            <!-- Stats/Phase Card -->
            <div class="lg:col-span-1 flex flex-col gap-4">
              <div
                class="bg-white dark:bg-card-dark rounded-2xl p-6 border border-slate-200 dark:border-[#4d423d] flex flex-col gap-4 h-full relative overflow-hidden shadow-sm"
              >
                <div
                  class="absolute top-0 right-0 w-32 h-32 bg-[#4a3b32] opacity-30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"
                ></div>
                <div class="flex items-center justify-between">
                  <h3 class="text-slate-900 dark:text-white font-bold text-lg">
                    {{ ts.text().dashboard.phase_label }}
                  </h3>
                  <span
                    class="text-primary-dark dark:text-primary text-sm font-bold bg-primary/10 px-2 py-1 rounded"
                    >{{ ts.text().dashboard.week }}</span
                  >
                </div>
                <div class="mt-2">
                  <p
                    class="text-2xl font-bold text-slate-900 dark:text-white mb-1"
                  >
                    {{ ts.text().dashboard.phase_title }}
                  </p>
                  <p class="text-slate-600 dark:text-text-muted text-sm">
                    {{ ts.text().dashboard.phase_desc }}
                  </p>
                </div>
                <div class="mt-auto pt-6 flex flex-col gap-3">
                  <div
                    class="flex justify-between text-sm text-slate-900 dark:text-white mb-1"
                  >
                    <span>{{ ts.text().dashboard.prog_label }}</span>
                    <span class="font-bold">25%</span>
                  </div>
                  <div
                    class="w-full bg-slate-200 dark:bg-[#1a1716] rounded-full h-2"
                  >
                    <div
                      class="bg-primary h-2 rounded-full"
                      style="width: 25%"
                    ></div>
                  </div>
                  <div class="flex gap-4 mt-2">
                    <div class="flex flex-col">
                      <span
                        class="text-slate-500 dark:text-text-muted text-xs"
                        >{{ ts.text().dashboard.sessions_done }}</span
                      >
                      <span
                        class="text-slate-900 dark:text-white font-bold text-lg"
                        >12</span
                      >
                    </div>
                    <div class="w-px bg-slate-200 dark:bg-[#4d423d]"></div>
                    <div class="flex flex-col">
                      <span
                        class="text-slate-500 dark:text-text-muted text-xs"
                        >{{ ts.text().dashboard.streak }}</span
                      >
                      <span
                        class="text-slate-900 dark:text-white font-bold text-lg flex items-center gap-1"
                      >
                        4
                        <span
                          class="material-symbols-outlined text-orange-400 text-sm"
                          >local_fire_department</span
                        >
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div>
            <h3
              (click)="navigateTo('metabolic')"
              class="cursor-pointer hover:text-primary transition-colors text-slate-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2"
            >
              <span class="material-symbols-outlined text-teal-500"
                >ecg_heart</span
              >
              {{ ts.text().dashboard.meta_title }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- Hydration -->
              <div
                (click)="navigateTo('metabolic')"
                class="cursor-pointer bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-200 dark:border-[#4d423d] hover:border-[#665a52] transition-colors shadow-sm"
              >
                <div class="flex justify-between items-start mb-4">
                  <div
                    class="bg-teal-500/20 p-2 rounded-lg text-teal-600 dark:text-teal-400"
                  >
                    <span class="material-symbols-outlined">water_drop</span>
                  </div>
                  <span
                    class="text-xs font-bold text-slate-500 dark:text-text-muted uppercase"
                    >{{ ts.text().dashboard.daily_goal }}</span
                  >
                </div>
                <p class="text-slate-500 dark:text-text-muted text-sm mb-1">
                  {{ ts.text().dashboard.hydration }}
                </p>
                <div class="flex items-baseline gap-1 mb-3">
                  <span
                    class="text-2xl font-bold text-slate-900 dark:text-white"
                    >1.2L</span
                  >
                  <span class="text-sm text-slate-500 dark:text-text-muted"
                    >/ 2.5L</span
                  >
                </div>
                <div
                  class="w-full bg-slate-200 dark:bg-[#1a1716] rounded-full h-1.5"
                >
                  <div
                    class="bg-teal-500 h-1.5 rounded-full"
                    style="width: 48%"
                  ></div>
                </div>
              </div>

              <!-- Nutrition -->
              <div
                class="bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-200 dark:border-[#4d423d] hover:border-[#665a52] transition-colors shadow-sm"
              >
                <div class="flex justify-between items-start mb-4">
                  <div
                    class="bg-emerald-500/20 p-2 rounded-lg text-emerald-600 dark:text-emerald-400"
                  >
                    <span class="material-symbols-outlined">restaurant</span>
                  </div>
                  <span
                    class="text-xs font-bold text-slate-500 dark:text-text-muted uppercase"
                    >{{ ts.text().dashboard.today }}</span
                  >
                </div>
                <p class="text-slate-500 dark:text-text-muted text-sm mb-1">
                  {{ ts.text().dashboard.anti_inflam }}
                </p>
                <div class="flex items-baseline gap-1 mb-3">
                  <span
                    class="text-2xl font-bold text-slate-900 dark:text-white"
                    >8</span
                  >
                  <span class="text-sm text-slate-500 dark:text-text-muted">{{
                    ts.text().dashboard.score
                  }}</span>
                </div>
                <div
                  class="w-full bg-slate-200 dark:bg-[#1a1716] rounded-full h-1.5"
                >
                  <div
                    class="bg-emerald-500 h-1.5 rounded-full"
                    style="width: 80%"
                  ></div>
                </div>
              </div>

              <!-- Waist -->
              <div
                (click)="navigateTo('progress')"
                class="cursor-pointer bg-white dark:bg-card-dark p-5 rounded-2xl border border-slate-200 dark:border-[#4d423d] hover:border-[#665a52] transition-colors shadow-sm"
              >
                <div class="flex justify-between items-start mb-4">
                  <div
                    class="bg-primary/20 p-2 rounded-lg text-primary-dark dark:text-primary"
                  >
                    <span class="material-symbols-outlined">straighten</span>
                  </div>
                  <span
                    class="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1 bg-teal-400/10 px-2 py-0.5 rounded"
                  >
                    <span class="material-symbols-outlined text-[10px]"
                      >trending_down</span
                    >
                    2cm
                  </span>
                </div>
                <p class="text-slate-500 dark:text-text-muted text-sm mb-1">
                  {{ ts.text().dashboard.waist }}
                </p>
                <div class="flex items-baseline gap-1 mb-3">
                  <span
                    class="text-2xl font-bold text-slate-900 dark:text-white"
                    >68</span
                  >
                  <span class="text-sm text-slate-500 dark:text-text-muted"
                    >cm</span
                  >
                </div>
                <p class="text-xs text-slate-400 dark:text-text-muted">
                  {{ ts.text().dashboard.great_progress }}
                </p>
              </div>

              <!-- Fact/Tip -->
              <div
                class="bg-gradient-to-br from-[#4d423d] to-[#332c29] p-5 rounded-2xl border border-[#665a52] relative overflow-hidden shadow-sm"
              >
                <span
                  class="material-symbols-outlined absolute -bottom-4 -right-4 text-6xl text-white/5 rotate-12"
                  >lightbulb</span
                >
                <div class="flex items-center gap-2 mb-3">
                  <span class="material-symbols-outlined text-primary text-sm"
                    >tips_and_updates</span
                  >
                  <span
                    class="text-primary text-xs font-bold uppercase tracking-wider"
                    >{{ ts.text().dashboard.daily_fact }}</span
                  >
                </div>
                <p class="text-white text-sm font-medium leading-relaxed">
                  {{ ts.text().dashboard.fact_text }}
                </p>
                <button
                  class="mt-4 text-xs font-bold text-white underline decoration-primary decoration-2 underline-offset-4 hover:text-primary transition-colors cursor-pointer"
                >
                  {{ ts.text().dashboard.read_article }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  private router = inject(Router);
  ts = inject(TranslationService);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
