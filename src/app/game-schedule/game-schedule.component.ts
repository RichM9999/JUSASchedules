import { Location } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

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
import { GameAssignService } from "../services/game-assign.service";
import { GameConfirmService } from "../services/game-confirm.service";
import { GameNoteService } from "../services/game-note.service";
import { AssignableRefereeDataService } from '../services/filters/assignableReferee-data.service';
import { GameSetNumberOfRefsService } from '../services/game-setnumberofrefs.service';

import { Game } from '../models/game.model';
import { GameNote } from '../models/gameNote.model';
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
import { AssignResponse } from '../models/assignResponse';

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
  applyRefereeId: number = 0;
  gameNote: string = "";

  assignableReferees: GameReferee[] = [];

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
      , private gameAssignService: GameAssignService
      , private gameConfirmService: GameConfirmService
      , private assignableRefereeService : AssignableRefereeDataService
      , private setNumberOfRefsService : GameSetNumberOfRefsService
      , private noteService: GameNoteService
      , private renderer: Renderer2
      , private location: Location
    )
    {   
      this.gameDate = "(next Saturday)"; 
      this.gameRefereeId = 0;

      this.router.queryParams.subscribe(params => {
        this.gameDate = params['gamedate'] || "(next Saturday)";
        this.gameRefereeId = +params['referee'] || 0;
        location.replaceState(window.location.href.split('#')[1].split('?')[0]);
      });
    }

  ngOnInit() {

  }

  ngAfterViewInit() {
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
    this.assignableRefereeService.getReferees().subscribe(g => this.assignableReferees = g);
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

  // assignableReferees() {
  //   return this.gameReferees.filter(function(ref) {
  //     return ref.sysid > 0; 
  //   });
  // }

  searchReferee = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.assignableReferees
          .filter(v => v.displayname.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )    
  
  selectReferee(event: any, game: Game, position: string) {
    switch (position) {
      case "center":
        game.crid = event.item.sysid;
        game.centername = event.item.displayname;
        game.crstatusname = "(unsaved)";
        game.crupdatedon = null;
        break;
      case "AR1":
        game.ar1id = event.item.sysid;
        game.ar1name = event.item.displayname;
        game.ar1statusname = "(unsaved)";
        game.ar1updatedon = null;
        break;
      case "AR2":
        game.ar2id = event.item.sysid;
        game.ar2name = event.item.displayname;
        game.ar2statusname = "(unsaved)";
        game.ar2updatedon = null;
        break;
    }
  }

  getCellClass(isSpecial: boolean) {
    return isSpecial ? "refSpecial" : "";
  }

  doAssign(event, game: Game) {
    this.gameAssignService.doAssign(game.sysid, game.crid, game.ar1id, game.ar2id)
      .subscribe(r => 
        this.processAssign(r, game)
      );
  }

  doClearMultiple(event, games: Game[]) {
    games.forEach(game => {
      game.crid = null;
      game.ar1id = null;
      game.ar2id = null;
      this.doAssign(event, game);       
    });
  }

  doHoldAllMultiple(event, games: Game[]) {
    games.forEach(game => {
      game.crid = 21;
      game.ar1id = 21;
      game.ar2id = 21;
      this.doAssign(event, game);       
    });
  }

  doToBeAssignedAllMultiple(event, games: Game[]) {
    games.forEach(game => {
      game.crid = 5;
      game.ar1id = 5;
      game.ar2id = 5;
      this.doAssign(event, game);       
    });
  }

  doFillAll(event, games: Game[], refereeId: number) {
    if (refereeId <= 0)
      return;

    games.forEach(game => {
      game.crid = refereeId;
      game.ar1id = refereeId;
      game.ar2id = refereeId;
      this.doAssign(event, game);       
    });
    this.applyRefereeId = 0;
  }

  doFillOpen(event, games: Game[], refereeId: number) {
    if (refereeId <= 0)
      return;

      games.forEach(game => {
      if (game.crid == null)
        game.crid = refereeId;
      if (game.ar1id == null)        
        game.ar1id = refereeId;
      if (game.ar2id == null)
        game.ar2id = refereeId;
      this.doAssign(event, game);       
    });
    this.applyRefereeId = 0;
  }

  doClear(event, game: Game) {
    game.crid = null;
    game.ar1id = null;
    game.ar2id = null;
    this.doAssign(event, game);
  }

  doClearCenter(event, game: Game) {
    game.crid = null;
    this.doAssign(event, game);
  }
  doClearAR1(event, game: Game) {
    game.ar1id = null;
    this.doAssign(event, game);
  }
  doClearAR2(event, game: Game) {
    game.ar2id = null;
    this.doAssign(event, game);
  }

  doHoldAll(event, game: Game) {
    game.crid = 21;
    game.ar1id = 21;
    game.ar2id = 21;
    this.doAssign(event, game);
  }

  doHoldCenter(event, game: Game) {
    game.crid = 21;
    this.doAssign(event, game);
  }
  doHoldAR1(event, game: Game) {
    game.ar1id = 21;
    this.doAssign(event, game);
  }
  doHoldAR2(event, game: Game) {
    game.ar2id = 21;
    this.doAssign(event, game);
  }

  doToBeAssignedAll(event, game: Game) {
    game.crid = 5;
    game.ar1id = 5;
    game.ar2id = 5;
    this.doAssign(event, game);
  }

  doConfirmCenter(event, game: Game) {
    this.gameConfirmService.doConfirm(game.sysid, "center")
      .subscribe(r => 
        this.processAssign(r, game)
      );
  }
  doConfirmAR1(event, game: Game) {
    this.gameConfirmService.doConfirm(game.sysid, "AR1")
      .subscribe(r => 
        this.processAssign(r, game)
      );
  }
  doConfirmAR2(event, game: Game) {
    this.gameConfirmService.doConfirm(game.sysid, "AR2")
      .subscribe(r => 
        this.processAssign(r, game)
      );
  }

  setNumberOfRefs(event, game: Game, numberofrefs: number) {
    this.setNumberOfRefsService.setNumberOfRefs(game.sysid, numberofrefs)
      .subscribe(r => 
        this.processNumberOfRefsChange(r, game, numberofrefs)
      );
  }

  processNumberOfRefsChange(assignResponse: AssignResponse, game: Game, numberofRefs: number) {
    this.processAssign(assignResponse, game);
    game.numberofrefs = numberofRefs;
  }

  processAssign(assignResponse: AssignResponse, game: Game) {
    game.centername = assignResponse.centername;
    game.centerspecial = assignResponse.centerspecial
    game.crstatusname = assignResponse.crstatusname;
    game.crupdatedon = assignResponse.crstatusupdatedon;

    game.ar1name = assignResponse.ar1name;
    game.ar1special = assignResponse.ar1special;
    game.ar1updatedon = assignResponse.ar1statusupdatedon;
    game.ar1statusname = assignResponse.ar1statusname;

    game.ar2name = assignResponse.ar2name;
    game.ar2special = assignResponse.ar2special;
    game.ar2statusname = assignResponse.ar2statusname
    game.ar2updatedon = assignResponse.ar2statusupdatedon;

  }

  showNoteEditor(gameid: number) {
    var editorRow = document.getElementById("gameNote" + gameid.toString());
    this.renderer.setStyle(editorRow, "visibility", "visible");  
  }

  addNote(event, game: Game, note: string) {
    var row = event.target.closest("tr");

    this.noteService.addNote(game.sysid, note)
    .subscribe(notes => 
      this.updateNotes(game, notes)
    );
    row.style="visibility:collapse";
    this.gameNote = "";
  }

  updateNotes(game: Game, notes: GameNote[]) {
    game.gamenotes = notes;
  }

  removeNote(noteid: number, game: Game) {
    this.noteService.deleteNote(noteid)
    .subscribe(r => 
      this.hideNote(noteid, game)
    );
  }

  hideNote(noteid: number, game: Game) {
    for (var i=0; i< game.gamenotes.length; i++) {
      if (game.gamenotes[i].sysid == noteid) {
        game.gamenotes.splice(i, 1);
        break;
      }
    }
  }
  refereeFormatter = (ref: {displayname: string}) => ref.displayname || ref;
  
}
