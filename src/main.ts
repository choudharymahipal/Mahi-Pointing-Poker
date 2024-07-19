import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}
//Without Module
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

//Module based
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
