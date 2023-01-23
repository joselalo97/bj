import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accesibility-tab',
  templateUrl: './accesibility-tab.component.html',
  styleUrls: ['./accesibility-tab.component.scss']
})
export class AccesibilityTabComponent implements OnInit {
  margin: string = "0px"

  constructor(
    private readonly scroller: ViewportScroller) { }

  ngOnInit(): void {
    window.addEventListener('scroll', (e) => {
      if (window.screen.width >= 768) {
        if (e.target['scrollingElement'].scrollTop == 0) {
          this.margin = '0px';
        } else {
          this.margin = `${e.target['scrollingElement'].scrollTop}px`;
        }
      }
    })
  }

  scrollView(attrID: string) {
    const text = document.getElementById(attrID);
    this.scroller.scrollToPosition([0, text.offsetTop + (4 * 16)])
    if (window.screen.width >= 768) {
      this.margin = `${text.offsetTop + (4 * 16)}px`
    }
  }
}