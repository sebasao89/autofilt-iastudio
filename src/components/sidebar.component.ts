import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 border-r border-[#4d423d] bg-background-dark z-50">
      <div class="flex flex-col h-full p-6 justify-between">
        <div class="flex flex-col gap-8">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-primary/20 shadow-[0_0_15px_rgba(251,191,36,0.15)]" 
                 style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAtIB1mgWp_yC-YIAB--mft_40C8idzG3WHd7K2MplWIyX83emp8zT4DGzgi28m2z9UcUDuReqXm7Mg0fdpE67oQyl8LfwqmmXJU1Iz3Y-CnKUirJ-KnjylfkrA0h4mxDHb0iJ-17Xf5c6GL4llIHTSNkri9l1INYiaGaxnqnwGLg9NLsDGfxpXu-1Xy1MymIXORnJigfzxZn9qWcdRmLGQPhoyv6hNSgznHmTcOI0CsGadCIKF61OXBFeNqz-jtxI1GgWLccstVVyc')"></div>
            <div class="flex flex-col">
              <h1 class="text-white text-xl font-bold tracking-wide">AUTOLIFT</h1>
              <p class="text-text-muted text-xs font-medium uppercase tracking-wider">{{ ts.text().sidebar.subtitle }}</p>
            </div>
          </div>

          <!-- Navigation -->
          <nav class="flex flex-col gap-2">
            <a routerLink="/" routerLinkActive="bg-primary/20 text-white" [routerLinkActiveOptions]="{exact: true}" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-text-muted hover:bg-[#4d423d]/50 hover:text-white">
              <span class="material-symbols-outlined">dashboard</span>
              <p class="text-sm font-semibold">{{ ts.text().sidebar.dashboard }}</p>
            </a>
            <a routerLink="/session" routerLinkActive="bg-primary/20 text-white" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-text-muted hover:bg-[#4d423d]/50 hover:text-white">
              <span class="material-symbols-outlined">play_circle</span>
              <p class="text-sm font-medium">{{ ts.text().sidebar.session }}</p>
            </a>
            <a routerLink="/progress" routerLinkActive="bg-primary/20 text-white" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-text-muted hover:bg-[#4d423d]/50 hover:text-white">
              <span class="material-symbols-outlined">monitoring</span>
              <p class="text-sm font-medium">{{ ts.text().sidebar.progress }}</p>
            </a>
            <a routerLink="/metabolic" routerLinkActive="bg-primary/20 text-white" class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-text-muted hover:bg-[#4d423d]/50 hover:text-white">
              <span class="material-symbols-outlined">ecg_heart</span>
              <p class="text-sm font-medium">{{ ts.text().sidebar.metabolic }}</p>
            </a>
          </nav>
        </div>

        <!-- User Profile & Language -->
        <div class="flex flex-col gap-4">
          <button (click)="ts.toggleLanguage()" class="flex items-center justify-between px-4 py-2 rounded-lg bg-[#332c29] border border-[#4d423d] hover:border-primary/50 transition-colors group cursor-pointer">
            <div class="flex items-center gap-2 text-text-muted group-hover:text-white">
              <span class="material-symbols-outlined text-sm">language</span>
              <span class="text-xs font-bold uppercase tracking-wider">Idioma / Language</span>
            </div>
            <div class="flex items-center gap-1 text-xs">
              <span [class.text-primary]="ts.currentLang() === 'es'" [class.font-bold]="ts.currentLang() === 'es'" class="text-text-muted transition-colors">ES</span>
              <span class="text-text-muted">/</span>
              <span [class.text-primary]="ts.currentLang() === 'en'" [class.font-bold]="ts.currentLang() === 'en'" class="text-text-muted transition-colors">EN</span>
            </div>
          </button>

          <div class="h-px bg-gradient-to-r from-transparent via-[#4d423d] to-transparent"></div>
          <div class="flex items-center gap-3 px-2">
            <div class="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-[#4d423d]" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDneJH-CvfQyUAKAw_RUVE6rfl_4glnmwQQnLe-MIs-LzrDEC8tCTP3d79Ng5qsYjENL6RtbIV0JMsB4cTbbWshd7oKTisehXERwijX03ELx-aE1tOpm4ZBQ3_YFS7rhXMpb_cY3MpCJq5NCpk_damQwOb3qtvi2-qW_NMrXgTwJBPsfl4KG2Fs-00E4rEZNKIwNlXTG9urA-Kiucja0cMkFcQjDl04KDovOPPc40R1IWSrvouSoeE8L_sMLnHsU_QAhrsIekrHIPhZ')"></div>
            <div class="flex flex-col">
              <p class="text-white text-sm font-semibold">Elara Vance</p>
              <p class="text-text-muted text-xs">{{ ts.text().sidebar.member_type }}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  `
})
export class SidebarComponent {
  ts = inject(TranslationService);
}
