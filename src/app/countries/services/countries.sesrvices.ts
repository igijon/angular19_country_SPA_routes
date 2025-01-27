import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code: string ):  Observable<Country[]> {
    const url = `${ this.apiUrl }/alpha/${code}`;
    //Los operadores de RXJS permiten hacer cualquier cosa siempre que se tenga
    //un flujo de datos. Uno de ellos es el operador map de rxjs
    //Esto son extensiones reactivas
    return this.http.get<Country[]>(url)
      .pipe(
        catchError (
          error => {
            console.log(error);
            return of([]);
          }
        )
      );
  }

  searchCapital( term: string ):  Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${term}`;
    //Los operadores de RXJS permiten hacer cualquier cosa siempre que se tenga
    //un flujo de datos. Uno de ellos es el operador map de rxjs
    //Esto son extensiones reactivas
    return this.http.get<Country[]>(url)
      .pipe(
        catchError (
          error => {
            console.log(error);
            return of([]);
          }
        )
      );
  }

  searchCountry ( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError (
          error => {
            console.log(error);
            return of([]);
          }
        )
      );
  }

  searchRegion ( term: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError (
          error => {
            console.log(error);
            return of([]);
          }
        )
      );
  }


}
