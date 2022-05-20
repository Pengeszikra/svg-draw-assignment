export enum PROGRESS {
  INTRO,
  QUIZ,
  RESULTS,
}

export interface IQuestionSource {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export type TAnswerId = string;

export interface IAnswer {
  answerId: TAnswerId;
  answer: string;
}

export interface IQuestion {
  questionId: string;
  question: string;
  category: string;
  shuffledAnswerList: IAnswer[];
}

export interface IQuizState {
  sourceList: IQuestionSource[];
  correctAnswerList: TAnswerId[];
  solutionList: TAnswerId[];
  shuffledQuestionList: IQuestion[];
  answerIndex: number;
  progress: PROGRESS;
}