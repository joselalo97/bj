import { Component, OnInit } from '@angular/core';
import { Entities } from '@core/constants';

@Component({
  selector: 'header-pub',
  templateUrl: './header-pub.component.html',
  styleUrls: ['./header-pub.component.scss']
})
export class HeaderPubComponent implements OnInit {


  public entitys: typeof Entities = Entities;

  constructor() { }

  ngOnInit(): void {
    const show = setTimeout(()=>{
      const links = document.getElementsByClassName('link')
      for (let index = 0; index < links.length; index++) {
        links[index].classList.add('in-show');
      }
      clearTimeout(show)
    },300)
  }

}
