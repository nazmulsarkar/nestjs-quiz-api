export class BaseAnswerInput {
  title: string;
  description: string;
  answerBy: {
    id: string;
    username: string;
    email: string;
    displayName: string;
  };
}
