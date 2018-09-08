import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameDataService } from '../services/game-data.service'
import { GameNumberDataService } from '../services/filters/gameNumber-data.service';
import { GameDivisionDataService } from '../services/filters/gameDivision-data.service';
import { GameTypeDataService } from '../services/filters/gameType-data.service';
import { GameDateDataService } from '../services/filters/gameDate-data.service';
import { GameTimeDataService } from '../services/filters/gameTime-data.service';
import { GameFieldDataService } from '../services/filters/gameField-data.service';
import { GameTeamDataService } from '../services/filters/gameTeam-data.service';
import { GameRefereeDataService } from '../services/filters/gameReferee-data.service';
import { GameSignupService } from "../services/game-signup.service";

import { Game } from '../models/game.model';
import { GameNumber } from '../models/gameNumber.model';
import { GameDivision } from '../models/gameDivision.model';
import { GameType } from '../models/gameType.model';
import { GameDate } from '../models/gameDate.model';
import { GameTime } from '../models/gameTime.model';
import { GameField } from '../models/gameField.model';
import { GameTeam } from '../models/gameTeam.model';
import { GameReferee } from '../models/gameReferee.model';
import { User } from '../models/user';
import { SignupResponse } from '../models/signupResponse';

import { enableProdMode } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, NgModel } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { AppComponent } from '../app.component';

enableProdMode();

@Component({
  selector: 'app-game-schedule',
  templateUrl: './game-schedule.component.html',
  styleUrls: ['./game-schedule.component.css']
})
export class GameScheduleComponent implements OnInit {

  title = 'JUSA Referee Schedules';

  games: Game[] = [];

  gameNumbers: GameNumber[] = [];
  gameDivisions: GameDivision[] = [];
  gameTypes: GameType[] = [];
  gameDates: GameDate[] = [];
  gameTimes: GameTime[] = [];
  gameFields: GameField[] = [];
  gameTeams: GameTeam[] = [];
  gameReferees: GameReferee[] = [];

  orderBy: string = "field";

  gameNumber: string = "(any)";
  gameDivision: string = "(any)";
  gameType: string = "(any)";
  gameDate: string;
  gameTime: string = "(any)";
  gameField: string = "(any)";
  gameTeam: string = "(any)";
  gameRefereeId: number;

  lastValue: string = "";
  isOdd: boolean = false;

  currentUser: User;

  constructor(private gameService: GameDataService
      , private gameNumberService: GameNumberDataService
      , private gameDivisionService: GameDivisionDataService
      , private gameTypeService: GameTypeDataService
      , private gameDateService: GameDateDataService
      , private gameTimeService: GameTimeDataService
      , private gameFieldService: GameFieldDataService
      , private gameTeamService: GameTeamDataService
      , private gameRefereeService: GameRefereeDataService
      , private router: ActivatedRoute
      , private gameSignupService: GameSignupService
    )
    {    
      this.gameDate = this.router.snapshot.params.gamedate;
      this.gameRefereeId = +this.router.snapshot.params.refereeid;
    }

  ngOnInit() {
    this.getFilters();
    this.getGames();
  }

  getFilters() {
      this.gameNumberService.getNumbers().subscribe(g => this.gameNumbers = g);
      this.gameDivisionService.getDivisions().subscribe(g => this.gameDivisions = g);
      this.gameTypeService.getTypes().subscribe(g => this.gameTypes = g);
      this.gameDateService.getDates().subscribe(g => this.gameDates = g);
      this.gameTimeService.getTimes().subscribe(g => this.gameTimes = g);
      this.gameFieldService.getFields().subscribe(g => this.gameFields = g);
      this.gameTeamService.getTeams().subscribe(g => this.gameTeams = g);
      this.gameRefereeService.getReferees().subscribe(g => this.gameReferees = g);
  }

  getGames() {
    this.gameService.searchByDate(this.gameNumber, this.gameDivision, this.gameType, this.gameDate, this.gameTime, this.gameField, this.gameTeam, this.gameRefereeId, this.orderBy)
      .subscribe(g => this.games = g)
  }

  rowColor(field, index): string {
    if (index == 0)
    {
      this.isOdd = false;
      this.lastValue = "";
    }

    if (this.orderBy.indexOf("field") >= 0) {
      if (this.lastValue.length > 0 && this.lastValue !== field) {
        this.isOdd = !this.isOdd;
      }
    } else {
        this.isOdd = !this.isOdd;
    }
    this.lastValue = field;

    if (this.isOdd)
      return "gameRowOdd";
    else
      return "gameRowEven";
  }

  toggleOrderBy(source) {
    if (this.orderBy.indexOf(source) == -1) {
      this.orderBy = source;
    }
    else if (this.orderBy == source) {
      this.orderBy = "-" + source;
    } else if (this.orderBy == "-" + source) {
      this.orderBy = "";
    } else {
      this.orderBy = source;
    }
    this.getGames();
  }

  orderByIcon(source): string {
    if (this.orderBy.length === 0) {
      return "fas fa-sort fa-sm";
    } else if (this.orderBy === source) {
      return "fas fa-caret-up fa-sm";
    } else if (this.orderBy === "-" + source) {
      return "fas fa-caret-down fa-sm";
    } else {
      return "fas fa-sort fa-sm";
    }
  }

  openCenters(): number {
    var cnt = 0;

    this.games.forEach(game => {
      cnt += (game.crid == null && game.numberofrefs != 2 ) ? 1 : 0;
    });
    return cnt;
  }

  openARs(): number {
    var cnt = 0;

    this.games.forEach(game => {
      if (game.numberofrefs == 3) {
        cnt += (game.ar1id == null) ? 1 : 0;
        cnt += (game.ar2id == null) ? 1 : 0;
      }
    });
    return cnt;
  }

  openTwoMans(): number {
    var cnt = 0;

    this.games.forEach(game => {
      if (game.numberofrefs == 2) {
        cnt += (game.ar1id == null) ? 1 : 0;
        cnt += (game.ar2id == null) ? 1 : 0;
      }
    });
    return cnt;
  }

  openSpots(): number {
    var cnt = 0;

    this.games.forEach(game => {
      cnt += (game.crid == null && game.numberofrefs != 2 ) ? 1 : 0;
      cnt += (game.ar1id == null && game.numberofrefs != 1 ) ? 1 : 0;
      cnt += (game.ar2id == null && game.numberofrefs != 1 ) ? 1 : 0;
    });
    return cnt;
  }

  totalSpots(): number {
    var cnt = 0;

    this.games.forEach(game => {
      cnt += +game.numberofrefs;
    });
    return cnt;
  }

  openUrl(url) {
    window.open(url, "_blank");
  }

  toggleWithGame(popover, game: Game) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({game});
    }
  }

  getCellClassChanged(changed: boolean): string {
    if (changed) {
      return "gameCellChanged";
    } else {
      return "";
    }
  }

  getMapUrl(address: string): string {
    return "https://www.google.com/maps/place/" + encodeURI(address);
  }

  isAdmin() {
    if (!this.currentUser)
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.currentUser.isadmin;
  }

  doSignup(event: Event, gameid: number, position: string) {
    var button = (event.target || event.srcElement || event.currentTarget) as HTMLElement;
    this.gameSignupService.doSignup(gameid, position)
      .subscribe(r => 
        this.processSignup(button, r)
      );
  }

  processSignup(button: HTMLElement, response: SignupResponse) {
    if (!this.currentUser)
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    var parent = button.parentElement;
    if (parent.classList.contains("btn")) {
      parent = parent.parentElement;
    }

    if (!response.allowed) {
      parent.innerHTML= `<span style='color:red'>${response.reason}</span>`;
    } else {
      parent.innerHTML = `${this.currentUser.displayname}<BR />
      <span class="gridTextSmall">
          ${response.statusname} ${response.statusupdatedon}
      </span>`;
    }
    button.remove();
   
  }
}
