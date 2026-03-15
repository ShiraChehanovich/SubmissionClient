import React, { useState, useMemo } from "react";
import { useSubmissionsQuery, useBindSubmissionMutation } from "../../api/submissions";
import { Container, Loading, Error } from "./SubmissionsDisplay.styles";
import CreateSubmissionDialog from "../CreateSubmissionDialog/CreateSubmissionDialog";
import SubmissionsActions from "../SubmissionsActions/SubmissionsActions";
import SubmissionsTable from "../SubmissionsTable/SubmissionsTable";

const SubmissionsDisplay: React.FC = () => {
  const { data: submissions, isLoading, error } = useSubmissionsQuery();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bindingId, setBindingId] = useState<number | null>(null);
  const bindMutation = useBindSubmissionMutation((_data, _id) => setBindingId(null));

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];
    return submissions.filter((submission) => {
      const matchesName = submission.name.toLowerCase().includes(filterText.toLowerCase());
      const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [submissions, filterText, statusFilter]);

  const handleCreateNew = () => {
    setIsDialogOpen(true);
  };

  const handleBind = (id: number) => {
    setBindingId(id);
    bindMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <Container>
        <Loading>Loading submissions...</Loading>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Error>Error loading submissions: {error.message}</Error>
      </Container>
    );
  }

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
        bindingId={bindingId}
        onBind={handleBind}
      />
      <CreateSubmissionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </Container>
  );
};

export default SubmissionsDisplay;
