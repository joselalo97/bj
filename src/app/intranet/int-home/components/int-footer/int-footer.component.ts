import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'int-footer',
  templateUrl: './int-footer.component.html',
  styleUrls: ['./int-footer.component.scss']
})
export class IntFooterComponent implements OnInit {

  year: number = new Date().getFullYear()

  constructor() { }

  public ngOnInit(): void { }

}
