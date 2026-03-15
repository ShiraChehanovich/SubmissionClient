import React from "react";
import { ActionsContainer, FilterInput, AddButton, Select } from "./SubmissionsActions.styles";

interface SubmissionsActionsProps {
  filterText: string;
  onFilterChange: (text: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onCreate: () => void;
}

const SubmissionsActions: React.FC<SubmissionsActionsProps> = ({
  filterText,
  onFilterChange,
  statusFilter,
  onStatusFilterChange,
  onCreate,
}) => {
  return (
    <ActionsContainer>
      <FilterInput
        type="text"
        placeholder="Filter by name..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <Select value={statusFilter} onChange={(e) => onStatusFilterChange(e.target.value)}>
        <option value="all">All Statuses</option>
        <option value="new">New</option>
        <option value="bound">Bound</option>
        <option value="bind_failed">Bind Failed</option>
      </Select>
      <AddButton title="Create new submission" onClick={onCreate}>
        +
      </AddButton>
    </ActionsContainer>
  );
};

export default SubmissionsActions;
