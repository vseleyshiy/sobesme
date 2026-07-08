export interface IInterviewFeedback {
  score: number;
  stressScore: number;
  text: string;
  details: IInterviewFeedbackDetail[];
}

export interface IInterviewFeedbackDetail {
  topic: string;
  userAnswer: string;
  correction: string;
  searchQuery: string;
}
