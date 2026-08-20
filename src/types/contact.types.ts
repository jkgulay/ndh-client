export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactMessage extends ContactFormValues {
  _id: string;
  createdAt: string;
}
