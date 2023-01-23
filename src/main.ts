import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if ( environment.production ) {

  enableProdMode();

  window && (
    window.console.log = 
    window.console.warn = 
    window.console.info = 
    window.console.error = function() { }
  );

}

function bootstrap() {
  platformBrowserDynamic().bootstrapModule( AppModule )
    .catch( err => console.error( err ) );
};

if ( document.readyState === 'complete' ) {
  bootstrap();
} else {
  document.addEventListener( 'DOMContentLoaded', bootstrap );
}

// document.addEventListener('DOMContentLoaded', () => {
//      platformBrowserDynamic().bootstrapModule( AppModule )
//   .catch( err => console.error( err ) );
//    });
