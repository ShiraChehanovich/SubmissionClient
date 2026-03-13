import React from "react";
import { useSubmissions } from "../../hooks/useSubmissions";
import { Column, GlobalStyle, Header, HelperText, Page, Shell, Title } from "../App/App.styles";
import { SubmissionFilters } from "../SubmissionFilters/SubmissionFilters";
import { SubmissionsList } from "../SubmissionsList/SubmissionsList";
import { SubmissionForm } from "../SubmissionForm/SubmissionForm";
import { defaultBindState } from "../../types/bind";
import { PAGE_SUBTITLE, PAGE_TITLE } from "./SubmissionsPage.consts";

export const SubmissionsPage: React.FC = () => {
  const {
    submissions,
    loadingList,
    listError,
    activeSubmission,
    formName,
    formStatus,
    formError,
    saving,
    statusFilter,
    search,
    bindStates,
    filteredSubmissions,
    setSearch,
    setStatusFilter,
    fetchSubmissions,
    handleBind,
    handleEditClick,
    handleDelete,
    handleSave,
    resetForm,
    setFormName,
    setFormStatus,
  } = useSubmissions();

  return (
    <>
      <GlobalStyle />
      <Page>
        <Shell>
          <Column>
            <Header>
              <div>
                <Title>{PAGE_TITLE}</Title>
                <HelperText>{PAGE_SUBTITLE}</HelperText>
              </div>
            </Header>

            <SubmissionFilters
              search={search}
              statusFilter={statusFilter}
              loading={loadingList}
              onSearchChange={setSearch}
              onStatusFilterChange={setStatusFilter}
              onRefresh={fetchSubmissions}
            />

            <SubmissionsList
              submissions={filteredSubmissions}
              loading={loadingList}
              error={listError}
              bindStates={bindStates}
              onBind={handleBind}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              defaultBindState={defaultBindState}
            />
          </Column>

          <Column>
            <Header>
              <div>
                <Title>{activeSubmission ? "Edit submission" : "New submission"}</Title>
                <HelperText>
                  {activeSubmission
                    ? `Editing "${activeSubmission.name}".`
                    : "Create a submission and bind it later."}
                </HelperText>
              </div>
            </Header>

            <SubmissionForm
              activeSubmission={activeSubmission}
              formName={formName}
              formStatus={formStatus}
              formError={formError}
              saving={saving}
              onNameChange={setFormName}
              onStatusChange={setFormStatus}
              onSubmit={handleSave}
              onCancel={resetForm}
            />
          </Column>
        </Shell>
      </Page>
    </>
  );
};

