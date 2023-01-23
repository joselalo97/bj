import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'int-tribunals-courts-cons',
  templateUrl: './int-tribunals-courts-cons.component.html',
  styleUrls: ['./int-tribunals-courts-cons.component.scss']
})
export class IntTribunalsCourtsConsComponent implements OnInit {


  courts: { name: string, indice: string, img: string }[] = [
    { name: "Tribunal Constitucional Español", indice: "tcespanol", img: './assets/Img_OrganosInter_TribunalesYCortesConst/TribunalConstitucionalEspañol.png' },
    { name: "Corte Constitucional de la República de Colombia", indice: "cccolombia", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-colombia.png' },
    { name: "Suprema Corte de Estados Unidos de América", indice: "supremecourtusa", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-estados-unidos.png' },
    { name: "Tribunal Constitucional de Chile", indice: "tcchile", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-chile.png' },
    { name: "Corte Suprema de Justicia de la Nación de Argentina", indice: "csjnargentina", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-argentina.png' },
    { name: "Suprema Corte de Reino Unido", indice: "corteuk", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-reino-unido.png' },
    { name: "Tribunal Constitucional de Alemania", indice: "tcaleman", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-alemania.png' },
    { name: "Corte Constitucional de Italia", indice: "ccitaliana", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-italia.png' },
    { name: "Tribunal Superior de Australia", indice: "hcaustralia", img: './assets/Img_OrganosInter_TribunalesYCortesConst/scjn-australia.png' }
  ]

  constructor() { }

  public ngOnInit(): void { }

}
