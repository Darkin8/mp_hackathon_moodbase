import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { SummaryComponent } from "./summary/summary.component";

const routes: Routes = [
  { path: 'survey/:id', component: QuestionnaireComponent },
  { path: 'summary/:id', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
