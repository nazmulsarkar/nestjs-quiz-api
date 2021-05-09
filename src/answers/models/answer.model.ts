export class AnswerModel {
  public id: string = '';
  public title: string = '';
  public description: string = '';
  public questionId: string = '';
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public answerBy: AnswerByModel;
}

export class AnswerByModel {
  public id: string = '';
  public username: string = '';
  public email: string = '';
  public displayName: string = '';
}
