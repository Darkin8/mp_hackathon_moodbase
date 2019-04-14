import { Question } from "./Question";

export class ProjectData {
  id: string;
  title: string;

  numberOfVotes?: number;
  avgResult?: number;

  questions?: Array<Question>;

  constructor(init?: Partial<ProjectData>) {
    init && Object.assign(this, init);
  }
}
