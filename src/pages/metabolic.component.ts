import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { TranslationService } from "../services/translation.service";

@Component({
  selector: "app-metabolic",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="bg-background-light dark:bg-background-dark text-stone-900 dark:text-stone-100 min-h-screen flex flex-col font-body pb-20 lg:pb-0"
    >
      <main
        class="flex-1 w-full max-w-[1440px] mx-auto p-6 lg:p-10 flex flex-col gap-8"
      >
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-stone-200 dark:border-white/10 pb-6"
        >
          <div class="flex flex-col gap-2">
            <h1
              class="text-3xl md:text-4xl font-black tracking-tighter text-stone-900 dark:text-white"
            >
              {{ ts.text().metabolic.title }}
            </h1>
            <p class="text-stone-500 dark:text-stone-400 text-base md:text-lg">
              {{ ts.text().metabolic.subtitle }}
            </p>
          </div>
          <button
            (click)="back()"
            class="text-sm font-bold text-stone-500 hover:text-primary transition-colors cursor-pointer"
          >
            {{ ts.text().metabolic.back }}
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 h-full">
          <!-- Hydration Ring -->
          <div class="lg:col-span-5 flex flex-col gap-6">
            <div
              class="bg-sand dark:bg-card-dark rounded-xl p-8 border border-stone-200 dark:border-stone-700 shadow-lg relative overflow-hidden flex flex-col items-center justify-between min-h-[500px]"
            >
              <div class="w-full flex justify-between items-center z-10">
                <h3
                  class="text-lg font-bold text-stone-800 dark:text-white flex items-center gap-2"
                >
                  <span class="material-symbols-outlined text-refreshing"
                    >water_drop</span
                  >
                  {{ ts.text().metabolic.hydro_title }}
                </h3>
                <div class="text-right">
                  <p
                    class="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider"
                  >
                    {{ ts.text().metabolic.goal }}
                  </p>
                  <p class="text-xl font-bold text-stone-800 dark:text-white">
                    84 oz
                  </p>
                </div>
              </div>
              <div class="relative size-64 my-6">
                <svg class="size-full" viewBox="0 0 100 100">
                  <circle
                    class="text-white/50 dark:text-stone-700"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="currentColor"
                    stroke-width="8"
                  ></circle>
                  <circle
                    class="text-refreshing progress-ring__circle drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="currentColor"
                    stroke-dasharray="264"
                    stroke-dashoffset="100"
                    stroke-linecap="round"
                    stroke-width="8"
                  ></circle>
                </svg>
                <div
                  class="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <span
                    class="text-5xl font-display font-light text-stone-900 dark:text-white"
                    >48</span
                  >
                  <span
                    class="text-sm font-medium text-stone-600 dark:text-stone-400 mt-1"
                    >{{ ts.text().metabolic.consumed }}</span
                  >
                </div>
              </div>
              <div class="w-full flex flex-col gap-4 z-10">
                <button
                  class="w-full h-14 bg-primary hover:bg-primary-dark transition-all rounded-lg flex items-center justify-center gap-3 text-white font-bold text-lg shadow-[0_4px_20px_rgba(166,124,82,0.3)] active:scale-[0.98] cursor-pointer"
                >
                  <span class="material-symbols-outlined font-bold">add</span>
                  {{ ts.text().metabolic.add }}
                </button>
              </div>
            </div>
          </div>

          <!-- Protocol Lists -->
          <div class="lg:col-span-7 flex flex-col gap-6">
            <div
              class="bg-white dark:bg-card-dark rounded-xl p-6 lg:p-8 border border-stone-200 dark:border-stone-700"
            >
              <div class="flex items-center justify-between mb-6">
                <div>
                  <h3 class="text-lg font-bold text-stone-900 dark:text-white">
                    {{ ts.text().metabolic.protocol }}
                  </h3>
                  <p class="text-sm text-stone-500 dark:text-stone-400">
                    {{ ts.text().metabolic.proto_desc }}
                  </p>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Allies -->
                <div
                  class="bg-olive-bg dark:bg-[#1a2e1a] rounded-lg p-5 border border-olive-border dark:border-[#2f3e2f]"
                >
                  <div
                    class="flex items-center gap-2 mb-4 text-olive-text dark:text-[#88a858]"
                  >
                    <span class="material-symbols-outlined">check_circle</span>
                    <h4 class="font-bold uppercase tracking-wide text-sm">
                      {{ ts.text().metabolic.allies }}
                    </h4>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3">
                      <div
                        class="size-10 rounded bg-white dark:bg-[#253825] bg-cover bg-center shrink-0 border border-olive-border dark:border-white/5"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIV5SfVUT0dy2LB6-4-XRV03HXyifaGUB8GDJEKbN7uPYVB6TJVciUpc75FI9zVJUhdZ0HnB_-EJexTqHftqbmQkZrELv2Jxi7vw-SydwJaO7kadMdaSdoLG9Kt4gbwCNLi76z1UCbuYtjYsmS15PocUmQqpH7ARYj9UcOrtw1zA1PlyHEflxVyhxUz2oU_pw7CrQ5pv-I4lmKYRZpq7WDxqxqPepvqS2fbSDQdHkjaoI0Ei_a0PEhALdUPFdnHyQZYNS80KstX2iD')"
                      ></div>
                      <div>
                        <p
                          class="text-sm font-bold text-stone-900 dark:text-white"
                        >
                          {{ ts.text().metabolic.omega }}
                        </p>
                        <p class="text-xs text-stone-500 dark:text-stone-400">
                          {{ ts.text().metabolic.omega_desc }}
                        </p>
                      </div>
                    </li>
                    <li class="flex items-start gap-3">
                      <div
                        class="size-10 rounded bg-white dark:bg-[#253825] bg-cover bg-center shrink-0 border border-olive-border dark:border-white/5"
                        style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAClrbnCX4f4jECn793cePtSj2HdBLAtTNkTXNf3zxwUFIk-n9vIB24bImNrMzutTHzR_l-Zzx9u1V8eEwH0eS33goLpHPO0pUlt5swkul-_ay6ufm5VuU42rRR4NQbdAqbw-Cg6ct1MDfqQgteQQMxqHOP1pksCJ2_foZzHQxeIEQ8THwP4IiJUNu2ZQgwNnPGInEFOJVBY-m3q-cg794I7wVu3X45GwHquN9J8gXXDvEXG5_A87jWt0aAHDvPCoYbsmcz1Ub994CA')"
                      ></div>
                      <div>
                        <p
                          class="text-sm font-bold text-stone-900 dark:text-white"
                        >
                          {{ ts.text().metabolic.antiox }}
                        </p>
                        <p class="text-xs text-stone-500 dark:text-stone-400">
                          {{ ts.text().metabolic.antiox_desc }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <!-- Congestion -->
                <div
                  class="bg-terracotta-bg dark:bg-[#2e1d1a] rounded-lg p-5 border border-terracotta-border dark:border-[#422a25]"
                >
                  <div
                    class="flex items-center gap-2 mb-4 text-terracotta-text dark:text-[#d47a68]"
                  >
                    <span class="material-symbols-outlined"
                      >do_not_disturb_on</span
                    >
                    <h4 class="font-bold uppercase tracking-wide text-sm">
                      {{ ts.text().metabolic.congestion }}
                    </h4>
                  </div>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-3 opacity-80">
                      <div
                        class="size-10 rounded bg-white dark:bg-[#3d2723] flex items-center justify-center border border-terracotta-border dark:border-white/5 shrink-0 text-terracotta-text dark:text-[#d47a68]"
                      >
                        <span class="material-symbols-outlined">grain</span>
                      </div>
                      <div>
                        <p
                          class="text-sm font-bold text-stone-900 dark:text-white"
                        >
                          {{ ts.text().metabolic.sodium }}
                        </p>
                        <p class="text-xs text-stone-500 dark:text-stone-400">
                          {{ ts.text().metabolic.sodium_desc }}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
})
export class MetabolicComponent {
  private router = inject(Router);
  ts = inject(TranslationService);

  back() {
    this.router.navigate(["/"]);
  }
}
