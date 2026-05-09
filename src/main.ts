import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { authInterceptor } from './app/interceptor/auth.interceptor';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),  // ✅ Add this
    {provide:HTTP_INTERCEPTORS,useClass:authInterceptor,multi:true},
    ...appConfig.providers                  // keep your existing config
  ]
})
.catch((err) => console.error(err));
