import { Injectable } from '@angular/core';
import { AbstractHttpService } from "../abstract-http-service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs/internal/observable/of";
import { delay, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Summary } from "../models/Summary";

@Injectable({
  providedIn: 'root'
})
export class SummaryService extends AbstractHttpService {

  constructor(http: HttpClient) {
    super();
  }

  public getSummary(id: string): Observable<Summary> {
    return this.getMockSummary(id);
  }

  private getMockSummary(id: string): Observable<Summary> {
    let data: Summary = {
      id: "abcdefg",
      surveyTitle: "Mediapark Hackathon 2019 survey, 14.04.2019",
      projects: [
        { id: "1", title: "Project 1", numberOfVotes: 10, questions: [
            { id: 1, title: "Question 1", avgResult: 1.1 },
            { id: 2, title: "Question 2", avgResult: 0.98 },
            { id: 3, title: "Question 3", avgResult: 2 },
            { id: 4, title: "Question 4", avgResult: -1.1 },
            { id: 5, title: "Question 5", avgResult: -0.5 },
          ]},
        { id: "2", title: "Project 2", numberOfVotes: 5, questions: [
            { id: 1, title: "Question 1", avgResult: 1.1 },
            { id: 2, title: "Question 2", avgResult: 0.98 },
            { id: 3, title: "Question 3", avgResult: 2 },
            { id: 4, title: "Question 4", avgResult: -1.1 },
            { id: 5, title: "Question 5", avgResult: -0.5 },
            { id: 6, title: "Question 1", avgResult: 1.1 },
            { id: 7, title: "Question 2", avgResult: 0.98 },
            { id: 8, title: "Question 3", avgResult: 2 },
            { id: 9, title: "Question 4", avgResult: -1.1 },
            { id: 10, title: "Question 5", avgResult: -0.5 },
          ]},
        { id: "3", title: "Project 3", numberOfVotes: 54, questions: [
            { id: 1, title: "Question 1", avgResult: 1.1 },
            { id: 2, title: "Question 2", avgResult: 0.98 },
            { id: 3, title: "Question 3", avgResult: 2 },
            { id: 4, title: "Question 4", avgResult: -1.1 },
            { id: 5, title: "Question 5", avgResult: -0.5 },
          ]},
        { id: "4", title: "Project 4", numberOfVotes: 13, questions: [
            { id: 1, title: "Question 1", avgResult: 1.1 },
            { id: 2, title: "Question 2", avgResult: 0.98 },
            { id: 3, title: "Question 3", avgResult: 2 },
            { id: 4, title: "Question 4", avgResult: -1.1 },
            { id: 5, title: "Question 5", avgResult: -0.5 },
          ]},
        { id: "5", title: "Project 5", numberOfVotes: 2, questions: [
            { id: 1, title: "Question 1", avgResult: 1.1 },
            { id: 2, title: "Question 2", avgResult: 0.98 },
            { id: 3, title: "Question 3", avgResult: 2 },
            { id: 4, title: "Question 4", avgResult: -1.1 },
            { id: 5, title: "Question 5", avgResult: -0.5 },
          ]},
        { id: "6", title: "Project 6", numberOfVotes: 76, questions: [
            { id: 1, title: "Question 1", avgResult: 1.1 },
            { id: 2, title: "Question 2", avgResult: 0.98 },
            { id: 3, title: "Question 3", avgResult: 2 },
            { id: 4, title: "Question 4", avgResult: -1.1 },
            { id: 5, title: "Question 5", avgResult: -0.5 },
          ]}
      ]
    };

    return of(data).pipe(
      delay(2000),
      map(result => new Summary(result))
    );
  }
}
