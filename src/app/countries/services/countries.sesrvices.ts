import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore= {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {countries: []},
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );

  }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        delay(2000) //Una vez se emite el valor del observable no se queda la pantalla en blanco sin cargar
      );
  }

  searchCountryByAlphaCode( code: string ):  Observable<Country | null>  {
    const url = `${ this.apiUrl }/alpha/${code}`;
    //Los operadores de RXJS permiten hacer cualquier cosa siempre que se tenga
    //un flujo de datos. Uno de ellos es el operador map de rxjs
    //Esto son extensiones reactivas
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0]: null),
        catchError(() => of(null))
      );
  }

  searchCapital( term: string ):  Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${term}`;
    //Los operadores de RXJS permiten hacer cualquier cosa siempre que se tenga
    //un flujo de datos. Uno de ellos es el operador map de rxjs
    //Esto son extensiones reactivas
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries}),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountry ( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCountry = { term, countries}),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion ( region: Region ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries}),
        tap( () => this.saveToLocalStorage() )
      );
  }


}
