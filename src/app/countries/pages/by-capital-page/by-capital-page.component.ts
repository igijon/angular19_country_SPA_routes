import { Component } from '@angular/core';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
  searchByCapital(term: string) {
    console.log('Desde ByCapitalPage');
    console.log({ term });

  }
}
