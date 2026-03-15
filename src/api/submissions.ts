import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../config/api";
import type { Submission } from "../types/submission";

export const fetchSubmissions = async (): Promise<Submission[]> => {
  const response = await fetch(`${API_BASE}/submissions`);
  if (!response.ok) {
    throw new Error("Failed to fetch submissions");
  }
  return response.json();
};

export const createSubmission = async (name: string): Promise<Submission> => {
  const response = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to create submission");
  }
  return response.json();
};

export const bindSubmission = async (id: number): Promise<Submission> => {
  const response = await fetch(`${API_BASE}/submissions/${id}/bind`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to bind submission");
  }
  return response.json();
};

export const useSubmissionsQuery = () => {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });
};

export const useCreateSubmissionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};

export const useBindSubmissionMutation = (onSuccess?: (data: Submission, variables: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bindSubmission,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      onSuccess?.(data, variables);
    },
  });
};
