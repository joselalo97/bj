import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { ViewerService } from '../../services/viewer.service';

@Component({
  selector: 'v-taquigraficas',
  templateUrl: './v-taquigraficas.component.html',
  styleUrls: ['./v-taquigraficas.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VTaquigraficasComponent {

  urlVideo: boolean = false;
  video:any;
  document: any
  archivo:any
  isLoad: boolean = true
  @Input()
  set documento(doc:any){
    if(doc){
      this.isLoad = true
      this.document = doc
      if(this.document["video"] !== undefined){
        this.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.document["video"]);
        this.urlVideo = true;
      }else {
        this.urlVideo = false;
      }
    }

    this.vService.getDocumentoVTaquigrafica(this.document["archivo"]).subscribe(data => {
      this.archivo = data;
      this.isLoad = false
    });

  }

  constructor(private vService: ViewerService,private sanitizer: DomSanitizer) { 
  }

}
