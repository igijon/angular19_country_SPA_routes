import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.sesrvices';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  standalone: false,

  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent implements OnInit{
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor( private countriesService: CountriesService ){}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  searchByRegion(term: Region) {
    this.isLoading = true;
    this.selectedRegion = term;
    //Nos tenemos que suscribir al observable para que se emita
    this.countriesService.searchRegion( term )
      .subscribe( countries => {
        this.isLoading = false;
        this.countries = countries;
      });

  }
}
