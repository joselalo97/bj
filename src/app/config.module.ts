import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Preferences } from './preferences';


const globalRippleConfig: RippleGlobalOptions = {
  disabled: false,
  terminateOnPointerUp: false,
  animation: {
    enterDuration: 300,
    exitDuration: 0
  }
};

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
    pinch: { enable: false },
    rotate: { enable: false }
  }
}

@NgModule({
  imports: [
    BrowserAnimationsModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    Preferences,
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ]
})
export class ConfigModule { }
