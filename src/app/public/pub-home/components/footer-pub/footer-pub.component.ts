import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer-pub',
  templateUrl: './footer-pub.component.html',
  styleUrls: ['./footer-pub.component.scss']
})
export class FooterPubComponent implements OnInit {

  age: Date = new Date()

  constructor() { }

  ngOnInit(): void {
  }

}
