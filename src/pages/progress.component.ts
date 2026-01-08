import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AiService } from '../services/ai.service';
import { TranslationService } from '../services/translation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 min-h-screen flex flex-col overflow-x-hidden pb-20 lg:pb-0">
      <main class="flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
        
        <!-- Header -->
        <div class="col-span-1 xl:col-span-12 mb-2">
          <div class="flex flex-wrap justify-between items-end gap-4">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2 text-primary text-sm font-bold tracking-wider uppercase">
                <span class="material-symbols-outlined text-sm">science</span>
                <span>{{ ts.text().progress.check_in }}</span>
              </div>
              <h1 class="text-gray-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.02em]">{{ ts.text().progress.title }}</h1>
              <p class="text-gray-500 dark:text-gray-400 text-base font-normal">{{ ts.text().progress.desc }}</p>
            </div>
            <div class="flex items-center gap-4">
              <button (click)="back()" class="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded text-sm hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer">{{ ts.text().general.back }}</button>
              <button class="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary hover:bg-opacity-90 transition-all text-stone-900 text-sm font-bold shadow-[0_0_15px_rgba(251,146,60,0.3)]">
                {{ ts.text().progress.save }}
              </button>
            </div>
          </div>
        </div>

        <!-- Left Col: Photo & AI Analysis -->
        <section class="col-span-1 xl:col-span-7 flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold flex items-center gap-2">
              <span class="material-symbols-outlined text-primary">compare</span>
              {{ ts.text().progress.compare_title }}
            </h2>
            <div class="flex items-center gap-3 bg-white dark:bg-card-dark px-4 py-2 rounded-full border border-gray-200 dark:border-stone-700">
              <span class="text-sm font-medium text-gray-500 dark:text-gray-300">{{ ts.text().progress.ghost }}</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked>
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-stone-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <!-- Main Image Viewer -->
          <div class="relative w-full aspect-[4/3] bg-[#0f0e0d] rounded-xl overflow-hidden border border-stone-700 group shadow-2xl">
            <!-- If we have a user uploaded image for analysis, show that predominantly, else show default compare -->
            @if (!selectedImage()) {
                <div class="absolute inset-0 w-full h-full bg-cover bg-center opacity-50 mix-blend-overlay pointer-events-none z-10" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbIr06uS1JbAnNg7bJ-F8CBpNSDrriwWe0GqQqfikEWgITk-rxuZJiCyUtAjunjRisBw08U_W08GsXXUzZOgR-eUmNDuWTROMSYb77MF_qwj5TKPDZgPO64_bFibuyMO36DPt4n7uLKV-H35fp_rFjhwL0o0F0FUcsOjxv8pGw0SFApP51sxywpGVGTZgh-q8IrmgQS-UbE9codWlzVdK5S-EKllLSri0NDOZX5NqQACzQqOPyV91VfPQKZfY-UyOuBrHTOyoATaRC'); filter: grayscale(100%) contrast(1.2)"></div>
                <div class="absolute inset-0 w-full h-full bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDmEWc74cudYSXBIGJ_iPIZVaRonQFlJTghVQMzUCQkyuh8POL_1IWMyHhHzAILHr0tnoTLltxDedHfn9Bn7l5Kl7eftbU_Ij6FVQOq-_vOwzZbIY1PeoBx00ctDbUuNMOilZ-n5QudGihD8aIlliLDEe_hDRHMR2V8r9nUuCL9qz9qVRIK9H60ZbFOB5hSHcKM9XY6xN1ZriBVZYq8ujIGxIXCZ9mVmoImFlPHp52h9sA2Z3GgAWKPXsByOl5gKkO81uaUN3xjF1V1')"></div>
                <div class="absolute top-0 bottom-0 left-1/2 w-1 bg-primary cursor-ew-resize z-20 shadow-[0_0_15px_rgba(251,146,60,0.8)] flex items-center justify-center">
                  <div class="bg-primary text-stone-900 rounded-full p-1 shadow-lg">
                    <span class="material-symbols-outlined text-sm font-bold">code</span>
                  </div>
                </div>
                <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-wider z-20 border border-white/10">{{ ts.text().progress.before }}</div>
                <div class="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-stone-900 uppercase tracking-wider z-20 shadow-lg">{{ ts.text().progress.current }}</div>
            } @else {
                <!-- User Uploaded Image Display -->
                <img [src]="selectedImage()" class="w-full h-full object-contain bg-black" alt="Analysis Target">
                <div class="absolute bottom-4 right-4 z-30">
                     <button (click)="clearImage()" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">Clear</button>
                </div>
            }
          </div>

          <!-- AI Actions -->
          <div class="flex flex-col gap-4">
             <div class="flex gap-4">
                <label class="cursor-pointer flex-1 bg-[#332c29] hover:bg-[#3e3532] border border-[#4d423d] border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all">
                    <span class="material-symbols-outlined text-primary text-3xl">add_a_photo</span>
                    <span class="text-sm font-bold text-gray-300">{{ ts.text().progress.upload }}</span>
                    <input type="file" accept="image/*" class="hidden" (change)="handleImageUpload($event)">
                </label>
                <button 
                    [disabled]="!selectedImage() || isAnalyzing()"
                    (click)="analyzeImage()"
                    class="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-background-dark font-bold rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                    @if (isAnalyzing()) {
                        <span class="material-symbols-outlined animate-spin text-3xl">progress_activity</span>
                        <span class="text-sm">{{ ts.text().progress.analyzing }}</span>
                    } @else {
                        <span class="material-symbols-outlined text-3xl">auto_awesome</span>
                        <span class="text-sm">{{ ts.text().progress.analyze }}</span>
                    }
                </button>
             </div>

             <!-- AI Result -->
             @if (analysisResult()) {
                <div class="bg-[#211d1b] border border-[#4d423d] rounded-xl p-6 relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10">
                        <span class="material-symbols-outlined text-9xl text-primary">psychology</span>
                    </div>
                    <div class="relative z-10">
                        <h3 class="text-primary font-bold text-lg mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined">auto_awesome</span>
                            {{ ts.text().progress.result }}
                        </h3>
                        <div class="prose prose-invert max-w-none text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {{ analysisResult() }}
                        </div>
                    </div>
                </div>
             }
          </div>
        </section>

        <!-- Right Col: Metrics -->
        <section class="col-span-1 xl:col-span-5 flex flex-col gap-6">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">straighten</span>
            {{ ts.text().progress.metrics }}
          </h2>
          <div class="bg-white dark:bg-card-dark rounded-xl border border-gray-200 dark:border-stone-700 p-6 shadow-sm">
            <div class="flex flex-col md:flex-row gap-6">
              <div class="w-full md:w-1/3 flex flex-col items-center justify-center relative">
                <div class="relative w-32 h-64 opacity-80">
                  <img alt="Anatomical Figure" class="w-full h-full object-contain mix-blend-luminosity opacity-40 invert dark:invert-0 sepia" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd8F-vuwUmJ9hT2rLpTGCZ1MKplo4jTc8pKlyxak9ZhWYa6Wm_T6m-Ekay7kAw2YYRjhbx7_8B65PdVOwHCNcMdnrJrV-aOno0JUikxwpPEmxQU2Gy1fAEJ6EyjqYb7a478RVf2D51ftBrDG1wDu2Bf7RQF43p85LvVOOILTQJLPJwYKDnuXL0wz6wbHjq4A6o_AenzXh8ZpaxUQhTMyF-GdjnYSVsKpdIQE8wfTzq6tR_xGoX3AUKBNoQnopxnOlOtddH0-17ay78"/>
                </div>
              </div>
              <div class="w-full md:w-2/3 flex flex-col gap-4">
                <div class="relative group">
                  <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ ts.text().progress.waist_c }}</label>
                  <div class="relative flex items-center">
                    <input class="block w-full rounded-lg border-gray-300 dark:border-stone-700 bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5 pl-3 pr-12 font-mono" placeholder="0.0" type="number"/>
                    <span class="absolute right-3 text-xs text-gray-500 font-bold">CM</span>
                  </div>
                </div>
                <div class="relative group">
                  <label class="block text-xs font-medium text-primary mb-1">{{ ts.text().progress.hip_c }}</label>
                  <div class="relative flex items-center">
                    <input class="block w-full rounded-lg border-primary/50 bg-primary/5 text-gray-900 dark:text-white focus:ring-primary focus:border-primary sm:text-sm py-2.5 pl-3 pr-12 font-mono ring-1 ring-primary/20" type="number" defaultValue="94.2"/>
                    <span class="absolute right-3 text-xs text-gray-500 font-bold">CM</span>
                    <span class="absolute right-10 text-xs text-primary flex items-center bg-primary/10 px-1 rounded">
                      <span class="material-symbols-outlined text-[14px]">trending_down</span> -1.2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div class="text-xs text-primary font-bold uppercase mb-1">{{ ts.text().progress.consistency }}</div>
              <div class="text-2xl font-bold text-slate-900 dark:text-white flex items-end gap-1">
                12 <span class="text-sm font-normal text-slate-500 dark:text-gray-400 mb-1">{{ ts.text().progress.days }}</span>
              </div>
            </div>
            <div class="bg-slate-100 dark:bg-card-dark rounded-lg p-4 border border-slate-200 dark:border-stone-700">
              <div class="text-xs text-slate-500 dark:text-gray-400 font-bold uppercase mb-1">{{ ts.text().progress.next_m }}</div>
              <div class="text-xl font-bold text-slate-900 dark:text-white flex items-end gap-1">
                July 01
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `
})
export class ProgressComponent {
  private router = inject(Router);
  private aiService = inject(AiService);
  ts = inject(TranslationService);

  selectedImage = signal<string | null>(null);
  analysisResult = signal<string | null>(null);
  isAnalyzing = signal(false);

  back() {
    this.router.navigate(['/']);
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage.set(e.target?.result as string);
        this.analysisResult.set(null); // Clear previous
      };
      reader.readAsDataURL(file);
    }
  }

  clearImage() {
    this.selectedImage.set(null);
    this.analysisResult.set(null);
  }

  async analyzeImage() {
    const img = this.selectedImage();
    if (!img) return;

    this.isAnalyzing.set(true);
    // Extract base64 part
    const base64Data = img.split(',')[1];
    
    // Add language context to AI prompt
    const langInstruction = this.ts.currentLang() === 'es' ? 'Respond in Spanish.' : 'Respond in English.';
    const prompt = `Analyze this physique update photo in the context of a lymphatic drainage and body contouring wellness program. Identify posture, approximate body composition visual cues (do not use medical terms, keep it wellness focused), and give encouraging feedback on progress. Keep it brief and bulleted. ${langInstruction}`;
    
    const result = await this.aiService.analyzeImage(base64Data, prompt);
    this.analysisResult.set(result);
    this.isAnalyzing.set(false);
  }
}
