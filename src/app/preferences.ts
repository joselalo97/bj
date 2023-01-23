import { Injectable } from "@angular/core";

@Injectable()
export class Preferences {

   public screenReader: boolean = false;
   public pixelsBase: string = '14';
   public fontBase: string = 'default-font';
   public skin: string = 'default';
   public resultSize: number = 8;
   public isHome: boolean = false;
   public isAgent: boolean = false

}