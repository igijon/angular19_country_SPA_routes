import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.sesrvices';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  standalone: false,

  templateUrl: './by-country-page.component.html'
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
      this.countries = this.countriesService.cacheStore.byCountry.countries;
      this.initialValue = this.countriesService.cacheStore.byCountry.term;
  }
  searchByCountry(term: string) {
    this.isLoading = true;
    //Nos tenemos que suscribir al observable para que se emita
    this.countriesService.searchCountry( term )
      .subscribe( countries => {
        this.isLoading = false;
        this.countries = countries;
      });

  }

}
