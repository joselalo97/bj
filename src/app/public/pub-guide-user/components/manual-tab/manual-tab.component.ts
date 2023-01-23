import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from '@core/services';

@Component({
  selector: 'manual-tab',
  templateUrl: './manual-tab.component.html',
  styleUrls: ['./manual-tab.component.scss']
})
export class ManualTabComponent implements OnInit {

  margin: string = "0px"

  constructor(private toast: NotifyService,
    private readonly scroller: ViewportScroller) { }

  ngOnInit(): void {
    window.addEventListener('scroll',(e)=>{
      if(window.screen.width >= 768){
        if(e.target['scrollingElement'].scrollTop == 0){
          this.margin = '0px';
        } else {
          this.margin = `${e.target['scrollingElement'].scrollTop}px`;
        }
      }
    })
  }

  scrollInToView(attrID: string){
    const text = document.getElementById(attrID);
    this.scroller.scrollToPosition([0,text.offsetTop + (4*16)])
    if(window.screen.width >= 768){
      this.margin = `${text.offsetTop + (4*16)}px`
    }
    
  }

  public copyText(tag: HTMLElement) {
    if (tag.tagName != "I") return;
    const text = tag.attributes[2].value.replace(/'/g, '"');
    navigator.clipboard.writeText(text);
    this.toast.toastr('success',"Se ha copia en portapapeles", "Texto",1000,'top-right');
  }

}
