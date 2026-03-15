import React from "react";
import type { Submission } from "../../types/submission";
import type { UseMutationResult } from "@tanstack/react-query";
import { Table, Th, Td, Button } from "./SubmissionsTable.styles";

interface SubmissionsTableProps {
  submissions: Submission[];
  bindMutation: UseMutationResult<Submission, Error, number, unknown>;
  bindingId: number | null;
  onBind: (id: number) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  bindMutation,
  bindingId,
  onBind,
}) => {

  const renderTableHeader = () => {
    return (
      <tr>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>Status</Th>
        <Th></Th>
      </tr>
    );
  };

    const renderSubmissionRows = () => {
      return submissions.map((submission) => (
        <tr key={submission.id}>
            <Td>{submission.id}</Td>
            <Td>{submission.name}</Td>
            <Td>{submission.status}</Td>
            <Td>
              <Button
                onClick={() => onBind(submission.id)}
                disabled={bindMutation.isPending || submission.status !== "new"}
              >
                {bindMutation.isPending && bindingId === submission.id ? "Binding..." : "Bind"}
              </Button>
            </Td>
          </tr>
      ));
    };

  return (
    <Table>
      <thead>
        {renderTableHeader()}
      </thead>
      <tbody>
        {renderSubmissionRows()}
      </tbody>
    </Table>
  );
};

export default SubmissionsTable;
