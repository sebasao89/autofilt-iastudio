<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/13eGxskojDWkp6REW9cvw0KUpeaCbRAzr

## Run Locally

**Prerequisites:** Node.js, pnpm

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Configure your API key:
   ```bash
   # Copy the example environment file
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```
   Then edit `src/environments/environment.ts` and add your [Gemini API key](https://aistudio.google.com/app/apikey)

3. Run the app:
   ```bash
   pnpm dev
   ```

> ⚠️ **Security Note:** Never commit `environment.ts` to version control. It's already added to `.gitignore`.
