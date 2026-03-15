export type SubmissionStatus = "new" | "bound" | "bind_failed";

export interface Submission {
  id: number;
  name: string;
  status: SubmissionStatus;
  created_at: string;
  updated_at: string;
}
