import React from "react";
import {
  Overlay,
  Dialog,
  Title,
  Message,
  ButtonGroup,
  Button,
} from "./DeleteSubmissionDialog.styles";

interface DeleteSubmissionDialogProps {
  isOpen: boolean;
  submissionName?: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteSubmissionDialog: React.FC<DeleteSubmissionDialogProps> = ({
  isOpen,
  submissionName,
  isDeleting,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={isDeleting ? undefined : onCancel}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Title>Delete submission?</Title>
        <Message>
          Are you sure you want to delete
          {submissionName ? ` "${submissionName}"` : " this submission"}?
        </Message>
        <ButtonGroup>
          <Button onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </ButtonGroup>
      </Dialog>
    </Overlay>
  );
};

export default DeleteSubmissionDialog;

