import React, { useState, useMemo } from "react";
import {
  useSubmissionsQuery,
  useBindSubmissionMutation,
  useDeleteSubmissionMutation,
} from "../../api/submissions";
import { Container, Loading, Error } from "./SubmissionsDisplay.styles";
import CreateOrUpdateSubmissionDialog from "../CreateOrUpdateSubmissionDialog/CreateOrUpdateSubmissionDialog";
import DeleteSubmissionDialog from "../DeleteSubmissionDialog/DeleteSubmissionDialog";
import SubmissionsActions from "../SubmissionsActions/SubmissionsActions";
import SubmissionsTable from "../SubmissionsTable/SubmissionsTable";

const SubmissionsDisplay: React.FC = () => {
  const { data: submissions, isLoading, error } = useSubmissionsQuery();
  const [dialogState, setDialogState] = useState<{ id?: number; name?: string } | null>(null);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bindingId, setBindingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{ id: number; name: string } | null>(null);

  const bindMutation = useBindSubmissionMutation(() => setBindingId(null));
  const deleteMutation = useDeleteSubmissionMutation(() => setDeletingId(null));

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];
    return submissions.filter((submission) => {
      const matchesName = submission.name.toLowerCase().includes(filterText.toLowerCase());
      const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [submissions, filterText, statusFilter]);

  const handleCreateNew = () => setDialogState({});

  const handleBind = (id: number) => {
    setBindingId(id);
    bindMutation.mutate(id);
  };

  const handleRequestDelete = (id: number) => {
    const submission = submissions?.find((s) => s.id === id);
    if (!submission) return;
    setPendingDelete({ id: submission.id, name: submission.name });
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;
    setPendingDelete(null);
    setDeletingId(id);
    deleteMutation.mutate(id);
  };

  const handleEdit = (id: number) => {
    const submission = submissions?.find((s) => s.id === id);
    if (submission) setDialogState({ id: submission.id, name: submission.name });
  };

  if (isLoading) return <Container><Loading>Loading submissions...</Loading></Container>;
  if (error) return <Container><Error>Error loading submissions: {error.message}</Error></Container>;

  return (
    <Container>
      <SubmissionsActions
        filterText={filterText}
        onFilterChange={setFilterText}
        onCreate={handleCreateNew}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />
      <SubmissionsTable
        submissions={filteredSubmissions}
        bindMutation={bindMutation}
        deleteMutation={deleteMutation}
        bindingId={bindingId}
        deletingId={deletingId}
        onBind={handleBind}
        onEdit={handleEdit}
        onDelete={handleRequestDelete}
      />
      <CreateOrUpdateSubmissionDialog
        isOpen={!!dialogState}
        onClose={() => setDialogState(null)}
        submissionId={dialogState?.id}
        submissionName={dialogState?.name}
      />
      <DeleteSubmissionDialog
        isOpen={!!pendingDelete}
        submissionName={pendingDelete?.name}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default SubmissionsDisplay;
