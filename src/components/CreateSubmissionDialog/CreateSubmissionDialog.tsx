import React, { useState } from "react";
import { useCreateSubmissionMutation } from "../../api/submissions";
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
}

const CreateSubmissionDialog: React.FC<CreateSubmissionDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const createMutation = useCreateSubmissionMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await createMutation.mutateAsync(name.trim());
      setName("");
      setError(null);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create submission");
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
        <Title>Create New Submission</Title>
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
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </ButtonGroup>
        </Form>
      </Dialog>
    </Overlay>
  );
};

export default CreateSubmissionDialog;
