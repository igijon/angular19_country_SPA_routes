import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.sesrvices';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{

  //Aquí aún no se ha construido el HTML
  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        //Recibe el valor anterior (params) y devuelve un una suscripción al observable que se
        //devuelve
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id ) )
      )
      .subscribe( ( country ) => {
        if ( !country ) {
          return this.router.navigateByUrl('')
        }
        console.log('Tenemos un país');
        return;

      })
  }

  searchCountry ( code: string ) {
    this.countriesService.searchCountryByAlphaCode( code )
      .subscribe( country => {
        console.log( {country});
      });
  }


}
