import { Question } from "./Question";

export class Questionnaire {
  id: string;
  questions: Array<Question>;
  title?: string;
  slug?: string;
  description?: string;
  image?: string;

  userToken?: string;
  projectId?: string;

  constructor(init?: Partial<Questionnaire>) {
    init && Object.assign(this, init);
  }
}
