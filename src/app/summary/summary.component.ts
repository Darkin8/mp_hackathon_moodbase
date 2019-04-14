import { Component, OnInit } from '@angular/core';
import { SummaryService } from "./summary.service";
import { ActivatedRoute } from "@angular/router";
import { Summary } from "../models/Summary";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  current: Summary;

  constructor(
    private route: ActivatedRoute,
    private summaryService: SummaryService) { }

  ngOnInit() {
    let summaryId = this.route.snapshot.paramMap.get('id');

    this.summaryService.getSummary(summaryId)
      .subscribe(result => {
        this.current = result;
      });
  }

}
