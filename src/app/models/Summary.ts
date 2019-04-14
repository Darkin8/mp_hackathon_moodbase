import { ProjectData } from "./ProjectData";

export class Summary {
  id: string;
  projects?: Array<ProjectData>;
  surveyTitle?: string;

  constructor(init?: Partial<Summary>) {
    init && Object.assign(this, init);
  }
}
