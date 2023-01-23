import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@environment/environment';

@Injectable({ providedIn: 'root' })
export class ScriptService {

  constructor(
    @Inject( PLATFORM_ID )
    private readonly platformId: Object
  ) { }

  private scripts: string[] = [];

  public load(): Promise<boolean> {

    return new Promise(
      ( resolve ) =>
        resolve(
          isPlatformBrowser( this.platformId )
            && this.generateScripts()
        )
    );

  }

  private generateScripts(): boolean {

    for ( const script of this.scripts ) {

      let node = document.createElement('script');

      node.src = `${environment.scriptUrls}/${script}`;

      node.type = 'text/javascript';

      node.defer = true;

      document.getElementsByTagName( 'head' )[0]
        .appendChild( node );

    }

    return true;

  }

}
