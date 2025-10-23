import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // 👇 Patch: prevent <app-root> from ever keeping aria-hidden
const root = document.querySelector('app-root');
if (root) {
  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.type === 'attributes' && m.attributeName === 'aria-hidden') {
        root.removeAttribute('aria-hidden');
      }
    }
  });
  observer.observe(root, { attributes: true });
}