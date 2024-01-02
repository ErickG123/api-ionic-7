import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { PokemonService } from 'src/app/services/pokemon.service';
import { tap, catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.page.html',
  styleUrls: ['./pokemons.page.scss'],
})
export class PokemonsPage implements OnInit {
  pokemons: any[] = [];
  currentPage = 1;

  constructor(
    private pokemonService: PokemonService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loadPokemons();
  }

  async loadPokemons(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando...',
      spinner: 'bubbles'
    });
    await loading.present();

    this.pokemonService.getPokemons(this.currentPage).pipe(
      tap((res) => {
        this.pokemons.push(...res.data);
        event?.target.complete();
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }),
      catchError((err) => {
        console.log(err);
        return [];
      }),
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe();
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadPokemons(event);
  }
}
