import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.sesrvices';

type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor( private countriesService: CountriesService ){}

  searchByRegion(term: Region) {
    this.selectedRegion = term;
    //Nos tenemos que suscribir al observable para que se emita
    this.countriesService.searchRegion( term )
      .subscribe( countries => {
        this.countries = countries;
      });

  }
}
