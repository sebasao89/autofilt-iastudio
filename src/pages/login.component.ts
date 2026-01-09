import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1716] via-[#2a2320] to-[#1a1716] relative overflow-hidden"
    >
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
          style="animation-delay: 1s"
        ></div>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-teal-500/5 rounded-full blur-3xl"
        ></div>
      </div>

      <!-- Login Card -->
      <div class="relative z-10 w-full max-w-md mx-4">
        <!-- Logo & Branding -->
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-amber-600 rounded-2xl mb-6 shadow-lg shadow-primary/30 transform hover:scale-105 transition-transform duration-300"
          >
            <span
              class="material-symbols-outlined text-4xl text-background-dark"
              >spa</span
            >
          </div>
          <h1
            class="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
          >
            Autolift Wellness
          </h1>
          <p class="text-text-muted text-sm">
            Tu portal de bienestar inteligente
          </p>
        </div>

        <!-- Login Form Card -->
        <div
          class="bg-card-dark/80 backdrop-blur-xl rounded-3xl p-8 border border-[#4d423d] shadow-2xl"
        >
          <form (submit)="onLogin($event)" class="flex flex-col gap-6">
            <!-- Email Field -->
            <div class="flex flex-col gap-2">
              <label
                for="email"
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-base text-primary"
                  >mail</span
                >
                Correo electrónico
              </label>
              <div class="relative">
                <input
                  type="email"
                  id="email"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="tu@email.com"
                  class="w-full bg-[#1a1716] border border-[#4d423d] rounded-xl px-4 py-3.5 text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="flex flex-col gap-2">
              <label
                for="password"
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <span class="material-symbols-outlined text-base text-primary"
                  >lock</span
                >
                Contraseña
              </label>
              <div class="relative">
                <input
                  [type]="showPassword() ? 'text' : 'password'"
                  id="password"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="••••••••"
                  class="w-full bg-[#1a1716] border border-[#4d423d] rounded-xl px-4 py-3.5 pr-12 text-white placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  (click)="togglePassword()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                >
                  <span class="material-symbols-outlined text-xl">
                    {{ showPassword() ? "visibility_off" : "visibility" }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Remember & Forgot -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  class="w-4 h-4 rounded border-[#4d423d] bg-[#1a1716] text-primary focus:ring-primary/20 cursor-pointer"
                />
                <span
                  class="text-text-muted group-hover:text-white transition-colors"
                  >Recordarme</span
                >
              </label>
              <a
                href="#"
                class="text-primary hover:text-amber-400 transition-colors font-medium"
                >¿Olvidaste tu contraseña?</a
              >
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="isLoading()"
              class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-amber-500 hover:from-amber-500 hover:to-primary text-background-dark font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
            >
              @if (isLoading()) {
              <span class="material-symbols-outlined animate-spin"
                >progress_activity</span
              >
              <span>Ingresando...</span>
              } @else {
              <span>Ingresar</span>
              <span class="material-symbols-outlined">arrow_forward</span>
              }
            </button>
          </form>

          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-[#4d423d]"></div>
            <span class="text-text-muted text-xs uppercase tracking-wider"
              >O continúa con</span
            >
            <div class="flex-1 h-px bg-[#4d423d]"></div>
          </div>

          <!-- Social Login -->
          <div class="flex justify-center">
            <button
              class="flex items-center justify-center gap-2 bg-[#1a1716] border border-[#4d423d] rounded-xl py-3 px-8 text-white hover:border-primary/50 hover:bg-[#252120] transition-all duration-300 cursor-pointer"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span class="text-sm font-medium">Google</span>
            </button>
          </div>
        </div>

        <!-- Sign Up Link -->
        <p class="text-center mt-8 text-text-muted text-sm">
          ¿No tienes una cuenta?
          <a
            href="#"
            class="text-primary hover:text-amber-400 transition-colors font-semibold ml-1"
            >Regístrate gratis</a
          >
        </p>

        <!-- Footer -->
        <p class="text-center mt-6 text-text-muted/50 text-xs">
          © 2026 Autolift Wellness. Todos los derechos reservados.
        </p>
      </div>
    </div>
  `,
  imports: [FormsModule],
})
export class LoginComponent {
  private router = inject(Router);

  email = "";
  password = "";
  showPassword = signal(false);
  isLoading = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);

    // Simulate login delay, then redirect to dashboard
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(["/dashboard"]);
    }, 1000);
  }
}
