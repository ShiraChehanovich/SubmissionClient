import React from "react";
import type { Submission } from "../../types/submission";
import type { BindState } from "../../types/bind";
import {
  Button,
  ButtonRow,
  Card,
  CardFooter,
  CardHeader,
  Empty,
  ErrorBanner,
  HelperText,
  InlineError,
  List,
  StatusPill,
  SubmissionName,
  SuccessText,
} from "./SubmissionsList.styles";
import {
  BIND_BUTTON_LABEL,
  BINDING_TEXT,
  BIND_SUCCESS_TEXT,
  DELETE_BUTTON_LABEL,
  EDIT_BUTTON_LABEL,
  LIST_EMPTY_TEXT,
  LIST_LOADING_TEXT,
} from "./SubmissionsList.consts";

type Props = {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
  bindStates: Record<number, BindState>;
  onBind: (submission: Submission) => void;
  onEdit: (submission: Submission) => void;
  onDelete: (submission: Submission) => void;
  defaultBindState: BindState;
};

export const SubmissionsList: React.FC<Props> = ({
  submissions,
  loading,
  error,
  bindStates,
  onBind,
  onEdit,
  onDelete,
  defaultBindState,
}) => {
  return (
    <>
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <List>
        {loading && submissions.length === 0 ? (
          <Empty>{LIST_LOADING_TEXT}</Empty>
        ) : submissions.length === 0 ? (
          <Empty>{LIST_EMPTY_TEXT}</Empty>
        ) : (
          submissions.map((submission) => {
            const bindState = bindStates[submission.id] ?? defaultBindState;
            return (
              <Card key={submission.id}>
                <CardHeader>
                  <SubmissionName>{submission.name}</SubmissionName>
                  <StatusPill status={submission.status}>{submission.status}</StatusPill>
                </CardHeader>
                <CardFooter>
                  <ButtonRow>
                    <Button
                      type="button"
                      variant="primary"
                      loading={bindState.loading}
                      disabled={bindState.loading}
                      onClick={() => onBind(submission)}
                    >
                      {bindState.loading ? BINDING_TEXT : BIND_BUTTON_LABEL}
                    </Button>
                    <Button type="button" onClick={() => onEdit(submission)}>
                      {EDIT_BUTTON_LABEL}
                    </Button>
                    <Button type="button" variant="danger" onClick={() => onDelete(submission)}>
                      {DELETE_BUTTON_LABEL}
                    </Button>
                  </ButtonRow>
                  <div>
                    {bindState.loading && <HelperText>{BINDING_TEXT}</HelperText>}
                    {bindState.success && !bindState.loading && (
                      <SuccessText>{BIND_SUCCESS_TEXT}</SuccessText>
                    )}
                    {bindState.error && !bindState.loading && (
                      <InlineError>{bindState.error}</InlineError>
                    )}
                  </div>
                </CardFooter>
              </Card>
            );
          })
        )}
      </List>
    </>
  );
};

