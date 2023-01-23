import { Component, OnInit } from '@angular/core';
import { InformationSourceModel } from '@intranet/models/information-source.model';
import { IntranetService } from '@intranet/services/intranet.service';

@Component({
  selector: 'int-information-source',
  templateUrl: './int-information-source.component.html',
  styleUrls: ['./int-information-source.component.scss']
})
export class IntInformationSourceComponent implements OnInit {

  constructor(
    private readonly intranetService: IntranetService
  ) { }

  public informationSourceList: InformationSourceModel[] = [];

  public ngOnInit(): void {

    this.getInformationSource();

  }

  private getInformationSource(): void {

    this.intranetService.getInformationSource().subscribe(
      ( response: InformationSourceModel[] ) =>
        this.informationSourceList = response
    );

  }

}
