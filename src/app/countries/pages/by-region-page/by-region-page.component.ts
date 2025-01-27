import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.sesrvices';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ){}

  searchByRegion(term: string) {
    //Nos tenemos que suscribir al observable para que se emita
    this.countriesService.searchRegion( term )
      .subscribe( countries => {
        this.countries = countries;
      });

  }
}
