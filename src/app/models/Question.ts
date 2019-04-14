
export class Question {
  id: number;
  title: string;
  description?: string;
  value?: string;

  avgResult?: number;

  constructor(init?: Partial<Question>) {
    init && Object.assign(this, init);
  }
}
