import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entities } from '@core/constants';

@Component({
  selector: 'search-udc',
  templateUrl: './search-udc.component.html',
  styleUrls: ['./search-udc.component.scss']
})
export class SearchUdcComponent implements OnInit {

  entitys = Entities;
  activeTab: number = 0;
  figures: string[] = ['apps','keyboard upload_file','find_in_page'];
  file:any[] = [];
  tabActive: number = 0;
  query:string = "";
  isOpen: boolean = false;
  text: string = "";

  constructor(private router: Router) {
    if(this.router.url.includes('analisis-de-texto')){
      this.activeTab = 1;
      this.tabActive = 0;
    }
    
   }

  ngOnInit(): void {

    // const first = setTimeout(()=>{
    //   document.getElementById('gr-1').classList.add('active')
    //   clearTimeout(first);
    // },500)

  }

  openAnalyticText(){
    this.isOpen = true
    this.text = this.query
  }

  public fileGet(event) {
    this.readTxt(event);
  }

  private readTxt(event) {
    if (event[0].type == 'text/plain') {
      var lector = new FileReader();
      lector.onload = (e: any) => {
        var contenido = e.target.result;
        this.text = contenido;
        this.isOpen = true
      };
      lector.readAsText(event[0]);
      this.tabActive = 1;
      let _inputfile = document.getElementById('file-upload') as HTMLElement;
      _inputfile.attributes['type'].ownerElement.value = '';
    }
  }

  public upload(event) {
    this.readTxt(event);
  }
  
}
