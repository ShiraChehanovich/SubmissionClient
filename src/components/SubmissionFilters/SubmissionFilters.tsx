import React from "react";
import type { SubmissionStatus } from "../../types/submission";
import { Button, Select, StatusDot, TextInput, Toolbar } from "./SubmissionFilters.styles";
import {
  REFRESHING_LABEL,
  REFRESH_LABEL,
  SEARCH_PLACEHOLDER,
  STATUS_FILTER_LABELS,
} from "./SubmissionFilters.consts";

type Props = {
  search: string;
  statusFilter: "all" | SubmissionStatus;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: "all" | SubmissionStatus) => void;
  onRefresh: () => void;
};

export const SubmissionFilters: React.FC<Props> = ({
  search,
  statusFilter,
  loading,
  onSearchChange,
  onStatusFilterChange,
  onRefresh,
}) => {
  return (
    <Toolbar>
      <TextInput
        placeholder={SEARCH_PLACEHOLDER}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Select
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(
            e.target.value === "all" ? "all" : (e.target.value as SubmissionStatus),
          )
        }
      >
        <option value="all">{STATUS_FILTER_LABELS.all}</option>
        <option value="new">{STATUS_FILTER_LABELS.new}</option>
        <option value="bound">{STATUS_FILTER_LABELS.bound}</option>
        <option value="bind_failed">{STATUS_FILTER_LABELS.bindFailed}</option>
      </Select>
      <Button type="button" variant="ghost" onClick={onRefresh} loading={loading}>
        <StatusDot color="#22c55e" />
        {loading ? REFRESHING_LABEL : REFRESH_LABEL}
      </Button>
    </Toolbar>
  );
};

