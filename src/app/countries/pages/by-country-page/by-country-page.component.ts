import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.sesrvices';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ){}

  searchByCountry(term: string) {
    //Nos tenemos que suscribir al observable para que se emita
    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.countries = countries;
      });

  }

}
