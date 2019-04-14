import { Component, OnInit } from '@angular/core';
import { SummaryService } from "./summary.service";
import { ActivatedRoute } from "@angular/router";
import { Summary } from "../models/Summary";
import { ProjectData } from "../models/ProjectData";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  current: Summary;
  currentProject: ProjectData;
  state = -1;

  constructor(
    private route: ActivatedRoute,
    private summaryService: SummaryService) { }

  ngOnInit() {
    let summaryId = this.route.snapshot.paramMap.get('id');

    this.summaryService.getSummary(summaryId)
      .subscribe(result => {
        this.state = 1;
        this.current = result;
        this.current.projects && this.current.projects.forEach(p => {
          p.avgResult = p.questions && p.questions.length > 0 && (p.questions.reduce((s, q) => s + q.avgResult, 0.0)) / p.questions.length;
          console.info(p.avgResult);
        });
      });
  }

  public selectProject(project: ProjectData): void {
    this.state = 2;
    this.currentProject = project;
  }

  public backToProjects(): void {
    this.state = 1;
    this.currentProject = null;
  }
}
