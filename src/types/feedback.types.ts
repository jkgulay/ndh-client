export interface FeedbackFormValues {
  rating: number;
  comment: string;
}

export interface Feedback {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
}
