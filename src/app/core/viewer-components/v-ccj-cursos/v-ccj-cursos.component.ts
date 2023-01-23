import { Component, Input, OnInit } from '@angular/core';
import { Diplomado, Tema } from 'app/core/models/diplomado.model';

@Component({
  selector: 'v-ccj-cursos',
  templateUrl: './v-ccj-cursos.component.html',
  styleUrls: ['./v-ccj-cursos.component.scss']
})
export class VCcjCursosComponent implements OnInit {

  public doc: Diplomado = new Diplomado();
  public url: string = "";
  public second: string = "1";
  public init = -1;
  public isLoad: boolean = true;
  public nbTema: string = '';

  @Input()
  set documento(document: Diplomado) {
    this.isLoad = true
    if (document.id) {
      this.doc = document;
      this.getUrl(document.urlTransmision);
    }
  }

  get documento(): Diplomado {
    return this.doc;
  }


  constructor() { }

  ngOnInit(): void {
  }

  private getUrl(url) {
    let part: string = "";
    if (url) {
      if (url.includes("v=")) {
        part = url.split("v=")[1];
        if (part.includes("&t")) {
          this.url =
            "https://www.youtube.com/embed/" +
            part.split("&")[0].trim() +
            "?start=";
        } else {
          this.url = "https://www.youtube.com/embed/" + part.trim() + "?start=";
        }
      } else if (url.includes("be/")) {
        part = url.split("be/")[1];
        this.url = "https://www.youtube.com/embed/" + part.trim() + "?start=";
      }
    }
    this.isLoad = false
  }

  public playMinVideo(tema: Tema, index: number) {
    this.second = tema.minVideo + "&autoplay=1";
    this.nbTema = tema.nbTema
    this.init = index;
  }

  nextTime() {
    if (this.init <= this.doc.temas.length - 1) {
      this.init++;
      this.nbTema = this.doc.temas[this.init].nbTema
      this.second = this.doc.temas[this.init].minVideo + "&autoplay=1";
    }
  }

  beforeTime() {
    if (this.init != 0) {
      this.init--;
      this.second = this.doc.temas[this.init].minVideo + "&autoplay=1";
      this.nbTema = this.doc.temas[this.init].nbTema
    }
  }

}
