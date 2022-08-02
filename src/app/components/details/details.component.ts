import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  gameRating: number = 0
  gameId!: string;
  game!: Game;
  gameSub: Subscription;
  routeSub: Subscription
  constructor(
    private ActivatedRoutes: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.routeSub = new Subscription;
    this.gameSub = new Subscription;
    
  }

  ngOnInit(): void {
    this.routeSub = this.ActivatedRoutes.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId)
    })
  }
  getGameDetails(id: string): void {
    this.gameSub = this.httpService.getGameDetails(id).subscribe((gameResp: Game) => {
      this.game = gameResp;
      // console.log(this.game)
      // console.log(gameResp.metacritic)
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
       
      }, 1000)
    })
  }
  getColor(value: number): string {

    if (value > 75) {
      return '#5ee432'
    } else if (value > 50) {
      return '#fffa50'
    } else if (value > 30) {
      return '#f7aa38'
    } else {
      return '#ef4655'
    }
  }
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
