import React from "react";

import type {Submission} from "../../types/submission";
import type {UseMutationResult} from "@tanstack/react-query";
import SubmissionRowActions from "../SubmissionRowActions/SubmissionRowActions";

import {Table, Th, Td} from "./SubmissionsTable.styles";

interface SubmissionsTableProps {
    submissions: Submission[];
    bindMutation: UseMutationResult<Submission, Error, number, unknown>;
    deleteMutation: UseMutationResult<void, Error, number, unknown>;
    bindingId: number | null;
    deletingId: number | null;
    onBind: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
                                                               submissions,
                                                               bindMutation,
                                                               deleteMutation,
                                                               bindingId,
                                                               deletingId,
                                                               onBind,
                                                               onEdit,
                                                               onDelete,
                                                           }) => {
    return (
        <Table>
            <thead>
            <tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th></Th>
            </tr>
            </thead>
            <tbody>
            {submissions.map((submission) => (
                <tr key={submission.id}>
                    <Td>{submission.id}</Td>
                    <Td>{submission.name}</Td>
                    <Td>{submission.status}</Td>
                    <Td>
                        <SubmissionRowActions
                            submission={submission}
                            bindMutation={bindMutation}
                            deleteMutation={deleteMutation}
                            bindingId={bindingId}
                            deletingId={deletingId}
                            onBind={onBind}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </Td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default SubmissionsTable;
