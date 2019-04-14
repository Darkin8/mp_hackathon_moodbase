import { Injectable } from '@angular/core';
import { AbstractHttpService } from "../abstract-http-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Team } from "../models/Team";
import { catchError, delay, map } from "rxjs/operators";
import { of } from "rxjs/internal/observable/of";
import { globalConfig } from "../global.config";

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends AbstractHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  public getTeams(): Observable<Array<Team>> {
    //return this.getMockTeams();

    return this.http.get<Array<Team>>(this.getUrl(globalConfig.api.getTeams))
      .pipe(
        map(result => result.map(t => new Team(t))),
        catchError(this.handlerError)
      );
  }

  private getMockTeams(): Observable<Array<Team>> {
    let data = [
      { id: "1", title: "Team 1" },
      { id: "2", title: "Team 2" },
      { id: "3", title: "Team 3" },
      { id: "4", title: "Team 4" },
      { id: "5", title: "Team 5" },
      { id: "6", title: "Team 6" },
      { id: "7", title: "Team 7" },
      { id: "8", title: "Team 8" },
      { id: "9", title: "Team 9" },
      { id: "10", title: "Super Team 10" },
    ];

    return of(data).pipe(
      delay(2000),
      map(result => result.map(t => new Team(t)))
    );
  }
}
