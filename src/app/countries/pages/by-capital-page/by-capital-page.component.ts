import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.sesrvices';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  standalone: false,

  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor ( private countriesService: CountriesService){}

  searchByCapital(term: string) {
    this.isLoading = true;
    //Nos tenemos que suscribir al observable para que se emita
    this.countriesService.searchCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }
}
