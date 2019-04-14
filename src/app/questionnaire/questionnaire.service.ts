import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Questionnaire } from "../models/Questionnaire";
import { Question } from "../models/Question";
import { of } from "rxjs/internal/observable/of";
import { catchError, delay, flatMap, map } from "rxjs/operators";
import { AbstractHttpService } from "../abstract-http-service";
import { HttpClient } from "@angular/common/http";
import { globalConfig } from "../global.config";
import { LocalStorage } from "@ngx-pwa/local-storage";
import { tap } from "rxjs/internal/operators/tap";

const FINISHED_SURVEYS = "finishedSurveys";

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService extends AbstractHttpService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorage
  ) {
    super();
  }

  /**
   *
   *
   * @param id
   * @param userToken Some unique value to determine the Questionnaire is already finished by the User
   */
  public getQuestionnaire(id: string, userToken: string): Observable<Questionnaire> {
    return this.localStorage.getItem<Array<string>>(FINISHED_SURVEYS)
      .pipe(
        flatMap((list: Array<string>) => {
          if (list && list.length > 0 && list.find(q => q === id)) {
            return of(null);
          } else {

            //return this.getMockQuestionnaire(id, userToken);

            const params = new Map<string, string>();
            params.set("id", id);

            return this.http.get<Questionnaire>(this.getUrl(globalConfig.api.getQuestionnaire, params))
              .pipe(
                map(result => new Questionnaire(result)),
                catchError(this.handlerError)
              );
          }
        })
      );
  }

  private getMockQuestionnaire(id: string, userToken: string): Observable<Questionnaire> {
    let q = new Questionnaire({
      id: id,
      userToken: null,
      title: "Mediapark Hackathon 2019 survey",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt euismod semper. In hac habitasse platea dictumst. Suspendisse non pretium tortor. Donec id nulla finibus eros eleifend tincidunt. Pellentesque fermentum pretium eleifend. Etiam dui mi, eleifend id ante mollis, vulputate euismod metus. Praesent porttitor eros sit amet nisl consequat, cursus interdum nunc iaculis. Sed bibendum euismod varius. Duis lacinia ante vel risus pretium commodo. Suspendisse in ultrices risus. Aliquam scelerisque interdum felis, eu porta lectus aliquet ut. Phasellus ut tempor dui, ornare ultricies elit. Sed quis orci eu ipsum bibendum ullamcorper.",
      questions: [
        new Question({ id: 1, title: "What do you think about topic 1?", description: "Topic 1. Aliquam scelerisque interdum felis, eu porta lectus aliquet ut. Phasellus ut tempor dui, ornare ultricies elit. Sed quis orci eu ipsum bibendum ullamcorper."}),
        new Question({ id: 2, title: "What do you think about topic 2?", description: "Topic 2. Aliquam scelerisque interdum felis, eu porta lectus aliquet ut. Phasellus ut tempor dui, ornare ultricies elit. Sed quis orci eu ipsum bibendum ullamcorper."}),
        new Question({ id: 3, title: "What do you think about topic 3?", description: "Topic 3. Aliquam scelerisque interdum felis, eu porta lectus aliquet ut. Phasellus ut tempor dui, ornare ultricies elit. Sed quis orci eu ipsum bibendum ullamcorper."}),
        new Question({ id: 4, title: "What do you think about topic 4?", description: "Topic 4. Aliquam scelerisque interdum felis, eu porta lectus aliquet ut. Phasellus ut tempor dui, ornare ultricies elit. Sed quis orci eu ipsum bibendum ullamcorper."}),
        new Question({ id: 5, title: "What do you think about topic 5?", description: "Topic 5. Aliquam scelerisque interdum felis, eu porta lectus aliquet ut. Phasellus ut tempor dui, ornare ultricies elit. Sed quis orci eu ipsum bibendum ullamcorper."})
      ]
    });

    return of(q).pipe(delay(2000));
  }

  public saveAnswers(data: Questionnaire, userToken: string, teamId: string): Observable<boolean> {
    data.projectId = teamId;

    /*return this.saveMockAnswers(data, userToken)
      .pipe(
        tap(result => {
          this.localStorage.getItem<Array<string>>(FINISHED_SURVEYS)
            .subscribe((list: Array<string>) => {
              list = list || new Array<string>();
              list.push(data.id);

              this.localStorage.setItem(FINISHED_SURVEYS, list).subscribe(() => {
                console.info("Finished surveys list is updated");
              });
            })
        })
      );*/

    return this.http.post(this.getUrl(globalConfig.api.saveQuestionnaire), data)
      .pipe(
        map(result => true),
        tap(result => {
          this.localStorage.getItem<Array<string>>(FINISHED_SURVEYS)
            .subscribe((list: Array<string>) => {
              list = list || new Array<string>();
              list.push(data.slug);

              this.localStorage.setItem(FINISHED_SURVEYS, list).subscribe(() => {
                console.info("Finished surveys list is updated");
              });
            })
        }),
        catchError(this.handlerError)
      );
  }

  private saveMockAnswers(data: Questionnaire, userToken: string): Observable<boolean> {
    return of({ success: true }).pipe(
      map(result => true),
      delay(2000)
    )
  }
}
