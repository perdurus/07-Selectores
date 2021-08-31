import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseURL='https://restcountries.eu/rest/v2';
  // Africa, Americas, Asia, Europe, Oceania
  private _regiones:string[] =[ 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones():string[]{
    return [...this._regiones];
  }
  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region:string):Observable<PaisSmall[]>{
    const url:string =`${this.baseURL}/region/${region}?fields=alpha3Code;name`;

    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorAlphaCode(codigo:string):Observable<Pais|null>{
    
    if (!codigo){
      return of(null);
    }

    const url:string =`${this.baseURL}/alpha/${codigo}`;

    console.log(url);
    return this.http.get<Pais>(url);
  }

  //https://restcountries.eu/rest/v2/alpha/col
  //https://restcountries.eu/rest/v2/alpha/col?fields=name;alpha3Code
  getPaisPorAlphaCodeLite(codigo:string):Observable<PaisSmall>{

    const url:string =`${this.baseURL}/alpha/${codigo}?fields=alpha3Code;name`;

    console.log(url);
    return this.http.get<PaisSmall>(url);
  }

  getPaisesPorAlphaCode(codigos:string[]):Observable<PaisSmall[]>{

    if (!codigos){
      return of([]);
    }

    const peticiones:Observable<PaisSmall>[] = [];

    codigos.forEach(codigo => {
      const peticion = this.getPaisPorAlphaCodeLite(codigo);
      peticiones.push(peticion);
    });

    //Disparamos todas las peticiones 
    return combineLatest(peticiones)
  }
}
