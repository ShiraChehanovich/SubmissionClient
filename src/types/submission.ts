export type SubmissionStatus = "new" | "bound" | "bind_failed";

export interface Submission {
  id: number;
  name: string;
  status: SubmissionStatus;
}

