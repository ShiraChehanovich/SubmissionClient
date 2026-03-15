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

export const editSubmission = async (id: number, name: string): Promise<Submission> => {
  const response = await fetch(`${API_BASE}/submissions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to edit submission");
  }
  return response.json();
};

export const deleteSubmission = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/submissions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete submission");
  }
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

export const useEditSubmissionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) => editSubmission(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};

export const useDeleteSubmissionMutation = (
  onSettled?: (id: number) => void
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
    onSettled: (_data, _error, id) => {
      onSettled?.(id);
    },
  });
};
