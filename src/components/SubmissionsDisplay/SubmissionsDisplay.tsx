import React, { useState, useMemo } from "react";
import {
  useSubmissionsQuery,
  useBindSubmissionMutation,
  useDeleteSubmissionMutation,
} from "../../api/submissions";
import { Container, Loading, Error } from "./SubmissionsDisplay.styles";
import CreateOrUpdateSubmissionDialog from "../CreateOrUpdateSubmissionDialog/CreateOrUpdateSubmissionDialog";
import SubmissionsActions from "../SubmissionsActions/SubmissionsActions";
import SubmissionsTable from "../SubmissionsTable/SubmissionsTable";

const SubmissionsDisplay: React.FC = () => {
  const { data: submissions, isLoading, error } = useSubmissionsQuery();
  const [dialogState, setDialogState] = useState<{ id?: number; name?: string } | null>(null);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bindingId, setBindingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

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

  const handleDelete = (id: number) => {
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
        onDelete={handleDelete}
      />
      <CreateOrUpdateSubmissionDialog
        isOpen={!!dialogState}
        onClose={() => setDialogState(null)}
        submissionId={dialogState?.id}
        submissionName={dialogState?.name}
      />
    </Container>
  );
};

export default SubmissionsDisplay;
