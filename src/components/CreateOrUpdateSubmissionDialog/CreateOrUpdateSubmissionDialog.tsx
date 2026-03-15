import React, { useState, useEffect } from "react";
import {
  useCreateSubmissionMutation,
  useEditSubmissionMutation,
} from "../../api/submissions";
import {
  Overlay,
  Dialog,
  Title,
  Form,
  Label,
  Input,
  ButtonGroup,
  Button,
  ErrorMessage,
} from "./CreateSubmissionDialog.styles";

interface CreateSubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId?: number;
  submissionName?: string;
}

const CreateOrUpdateSubmissionDialog: React.FC<CreateSubmissionDialogProps> = ({
  isOpen,
  onClose,
  submissionId,
  submissionName = "",
}) => {
  const [name, setName] = useState(submissionName);
  const [error, setError] = useState<string | null>(null);
  const createMutation = useCreateSubmissionMutation();
  const editMutation = useEditSubmissionMutation();
  const isEdit = !!submissionId;

  useEffect(() => {
    setName(submissionName);
  }, [submissionName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      if (isEdit) {
        await editMutation.mutateAsync({ id: submissionId!, name: name.trim() });
      } else {
        await createMutation.mutateAsync(name.trim());
      }
      setName("");
      setError(null);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${isEdit ? "edit" : "create"} submission`
      );
    }
  };

  const handleCancel = () => {
    setName("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <Title>{isEdit ? "Edit Submission" : "Create New Submission"}</Title>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter submission name"
            />
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonGroup>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={createMutation.isPending || editMutation.isPending}
            >
              {createMutation.isPending || editMutation.isPending
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                ? "Save"
                : "Create"}
            </Button>
          </ButtonGroup>
        </Form>
      </Dialog>
    </Overlay>
  );
};

export default CreateOrUpdateSubmissionDialog;
