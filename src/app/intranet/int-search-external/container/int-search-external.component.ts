import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Library } from '@core/components';

@Component({
  selector: 'int-search-external',
  templateUrl: './int-search-external.component.html',
  styleUrls: ['./int-search-external.component.scss'],
})
export class IntSearchExternalComponent implements OnInit {
  public query: string = '';
  public fuente: string = '';
  public sourceLibrary: Library[] = [
    { name: 'VLEx', path: 'vlex' },
    { name: 'eLibro', path: 'elibro' },
    {
      name: 'Library of Congress',
      path: 'lcongress',
    },
    { name: 'Corte Europa', path: 'hudoc' },
  ];
  constructor(private param: ActivatedRoute, private route: Router) {
    this.param.paramMap.subscribe((data) => {
      this.query = data.get('q');
      this.fuente = this.route.url.split('-')[1].split('/')[1];
    });
  }

  ngOnInit(): void {}

  public searchText() {
    if (this.query.trim())
      this.route
        .navigateByUrl('/', { skipLocationChange: true })
        .then((success) => {
          this.route.navigate([
            '/busquedaexterna',
            this.query,
            '-',
            this.fuente,
            '0',
          ]);
        });
  }
}
