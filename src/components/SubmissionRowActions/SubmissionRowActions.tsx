import React from "react";
import type { Submission } from "../../types/submission";
import type { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../SubmissionsTable/SubmissionsTable.styles";

interface SubmissionRowActionsProps {
  submission: Submission;
  bindMutation: UseMutationResult<Submission, Error, number, unknown>;
  deleteMutation: UseMutationResult<void, Error, number, unknown>;
  bindingId: number | null;
  deletingId: number | null;
  onBind: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const SubmissionRowActions: React.FC<SubmissionRowActionsProps> = ({
  submission,
  bindMutation,
  deleteMutation,
  bindingId,
  deletingId,
  onBind,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <Button onClick={() => onEdit(submission.id)} style={{ marginRight: "8px" }}>
        Edit
      </Button>
      <Button
        onClick={() => onBind(submission.id)}
        disabled={bindMutation.isPending || submission.status !== "new"}
        style={{ marginRight: "8px" }}
      >
        {bindMutation.isPending && bindingId === submission.id ? "Binding..." : "Bind"}
      </Button>
      <Button
        onClick={() => onDelete(submission.id)}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending && deletingId === submission.id ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
};

export default SubmissionRowActions;
