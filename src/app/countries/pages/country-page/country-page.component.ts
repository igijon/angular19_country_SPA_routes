import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.sesrvices';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  standalone: false,

  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

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
        //devuelve. Transforma un observable en otro observable
        //switchMap( params => this.countriesService.searchCountryByAlphaCode( params.id ) )
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id ) )
      )
      .subscribe( ( country ) => {
        if ( !country ) return this.router.navigateByUrl('')
        return this.country = country;
      })
  }


}
