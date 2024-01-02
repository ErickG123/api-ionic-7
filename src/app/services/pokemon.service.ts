import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ApiResult {
  page: number;
  data: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemons(page = 1) {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}?page=${page}?&pageSize=10`
    );
  }

  getPokemonDetails(id: string) {
    return this.http.get<ApiResult>(
      `${environment.baseUrl}/${id}`
    )
  }
}
