import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  public sort: string = '';
  public games!: Array<Game>;
  private routeSub:Subscription;
  private gameSub:Subscription;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.routeSub = new Subscription;
    this.gameSub = new Subscription
  }


  ngOnInit(): void {
   this.routeSub= this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit')
      }
    })
  }
  searchGames(sort: string, search?: string) {
    this.gameSub= this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList)
    })
  }
  openGameDetails(id:number){
    this.router.navigate(['details',id])
  }
  ngOnDestroy(): void {
    if(this.gameSub){
      this.gameSub.unsubscribe()
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}
