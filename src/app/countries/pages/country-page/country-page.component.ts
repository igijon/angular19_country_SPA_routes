import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.sesrvices';

@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{

  //Aquí aún no se ha construido el HTML
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe( ({ id }) => {
        this.countriesService.searchCountryByAlphaCode( id )
          .subscribe( country => {
            console.log(country);

          });

      })
  }



}
