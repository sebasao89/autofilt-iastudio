import "@angular/compiler";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./src/app.component";
import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withHashLocation } from "@angular/router";
import { LoginComponent } from "./src/pages/login.component";
import { DashboardComponent } from "./src/pages/dashboard.component";
import { SessionComponent } from "./src/pages/session.component";
import { ProgressComponent } from "./src/pages/progress.component";
import { MetabolicComponent } from "./src/pages/metabolic.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(
      [
        { path: "", component: LoginComponent },
        { path: "dashboard", component: DashboardComponent },
        { path: "session", component: SessionComponent },
        { path: "progress", component: ProgressComponent },
        { path: "metabolic", component: MetabolicComponent },
      ],
      withHashLocation()
    ),
  ],
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.
