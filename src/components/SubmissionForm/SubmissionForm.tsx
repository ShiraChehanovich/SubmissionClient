import React from "react";
import type { Submission, SubmissionStatus } from "../../types/submission";
import {
  Button,
  Card,
  Field,
  Form,
  FormActions,
  HelperText,
  LabelRow,
  RequiredStar,
  Select,
  TextInput,
} from "./SubmissionForm.styles";
import {
  CANCEL_LABEL,
  CREATE_SUBMISSION_LABEL,
  EDIT_SUBTITLE_PREFIX,
  EDIT_SUBTITLE_SUFFIX,
  EDIT_TITLE,
  NAME_LABEL,
  NAME_PLACEHOLDER,
  NAME_REQUIRED_ASTERISK,
  NEW_SUBTITLE,
  NEW_TITLE,
  SAVE_CHANGES_LABEL,
  STATUS_ALLOWED_HELPER,
  STATUS_LABEL,
  STATUS_NEW_HELPER,
} from "./SubmissionForm.consts";

type Props = {
  activeSubmission: Submission | null;
  formName: string;
  formStatus: SubmissionStatus;
  formError: string | null;
  saving: boolean;
  onNameChange: (value: string) => void;
  onStatusChange: (value: SubmissionStatus) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export const SubmissionForm: React.FC<Props> = ({
  activeSubmission,
  formName,
  formStatus,
  formError,
  saving,
  onNameChange,
  onStatusChange,
  onSubmit,
  onCancel,
}) => {
  const isEditing = Boolean(activeSubmission);

  return (
    <Card>
      {formError && <HelperText as="div">{formError}</HelperText>}
      <Form onSubmit={onSubmit}>
        <Field>
          <LabelRow>
            <span>
              {NAME_LABEL} <RequiredStar>{NAME_REQUIRED_ASTERISK}</RequiredStar>
            </span>
          </LabelRow>
          <TextInput
            value={formName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={NAME_PLACEHOLDER}
          />
        </Field>

        {isEditing ? (
          <Field>
            <LabelRow>
              <span>
                {STATUS_LABEL} <RequiredStar>{NAME_REQUIRED_ASTERISK}</RequiredStar>
              </span>
              <HelperText>{STATUS_ALLOWED_HELPER}</HelperText>
            </LabelRow>
            <Select
              value={formStatus}
              onChange={(e) => onStatusChange(e.target.value as SubmissionStatus)}
            >
              <option value="new">new</option>
              <option value="bound">bound</option>
              <option value="bind_failed">bind_failed</option>
            </Select>
          </Field>
        ) : (
          <Field>
            <LabelRow>
              <span>{STATUS_LABEL}</span>
            </LabelRow>
            <HelperText>{STATUS_NEW_HELPER}</HelperText>
          </Field>
        )}

        <FormActions>
          {isEditing && (
            <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
              {CANCEL_LABEL}
            </Button>
          )}
          <Button type="submit" variant="primary" loading={saving} disabled={saving}>
            {saving ? SAVE_CHANGES_LABEL : isEditing ? SAVE_CHANGES_LABEL : CREATE_SUBMISSION_LABEL}
          </Button>
        </FormActions>
      </Form>
    </Card>
  );
};

