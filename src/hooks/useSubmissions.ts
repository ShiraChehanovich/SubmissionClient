import { useEffect, useMemo, useState } from "react";
import type { Submission, SubmissionStatus } from "../types/submission";
import type { BindState } from "../types/bind";
import { defaultBindState } from "../types/bind";

interface ApiError {
  message: string;
}

const API_BASE = "";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = (await res.json()) as ApiError | { detail?: string };
      if ("message" in data && data.message) {
        message = data.message;
      } else if ("detail" in data && data.detail) {
        message = data.detail;
      }
    } catch {
      // ignore JSON errors, fall back to generic message
    }
    throw new Error(message);
  }
  return (await res.json()) as T;
}

export function useSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  const [formName, setFormName] = useState("");
  const [formStatus, setFormStatus] = useState<SubmissionStatus>("new");
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [statusFilter, setStatusFilter] = useState<"all" | SubmissionStatus>("all");
  const [search, setSearch] = useState("");

  const [bindStates, setBindStates] = useState<Record<number, BindState>>({});

  const resetForm = () => {
    setActiveSubmission(null);
    setFormName("");
    setFormStatus("new");
    setFormError(null);
  };

  const populateFormFromSubmission = (submission: Submission) => {
    setActiveSubmission(submission);
    setFormName(submission.name);
    setFormStatus(submission.status);
    setFormError(null);
  };

  const fetchSubmissions = async () => {
    setLoadingList(true);
    setListError(null);
    try {
      const url = `${API_BASE}/submissions`;
      const data = await handleResponse<Submission[]>(await fetch(url));
      setSubmissions(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load submissions.";
      setListError(msg);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    void fetchSubmissions();
  }, []);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) {
        return false;
      }
      if (search.trim()) {
        return s.name.toLowerCase().includes(search.toLowerCase());
      }
      return true;
    });
  }, [submissions, statusFilter, search]);

  const validateForm = (): string | null => {
    if (!formName.trim()) {
      return "Name is required.";
    }
    if (!formStatus) {
      return "Status is required.";
    }
    return null;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSaving(true);
    setFormError(null);
    const payload: Partial<Submission> = activeSubmission
      ? {
          name: formName.trim(),
          status: formStatus,
        }
      : {
          name: formName.trim(),
          status: "new",
        };

    try {
      let saved: Submission;
      if (activeSubmission) {
        const res = await fetch(`${API_BASE}/submissions/${activeSubmission.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        saved = await handleResponse<Submission>(res);
      } else {
        const res = await fetch(`${API_BASE}/submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        saved = await handleResponse<Submission>(res);
      }

      setSubmissions((prev) => {
        const exists = prev.some((s) => s.id === saved.id);
        if (exists) {
          return prev.map((s) => (s.id === saved.id ? saved : s));
        }
        return [saved, ...prev];
      });

      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to save submission.";
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEditClick = (submission: Submission) => {
    populateFormFromSubmission(submission);
  };

  const handleDelete = async (submission: Submission) => {
    const confirmed = window.confirm(`Delete submission "${submission.name}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/submissions/${submission.id}`, {
        method: "DELETE",
      });
      if (!res.ok && res.status !== 204) {
        await handleResponse(res);
      }
      setSubmissions((prev) => prev.filter((s) => s.id !== submission.id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete submission.";
      window.alert(msg);
    }
  };

  const handleBind = async (submission: Submission) => {
    setBindStates((prev) => ({
      ...prev,
      [submission.id]: { loading: true, success: false, error: null },
    }));

    try {
      const res = await fetch(`${API_BASE}/submissions/${submission.id}/bind`, {
        method: "POST",
      });
      await handleResponse<unknown>(res);

      setBindStates((prev) => ({
        ...prev,
        [submission.id]: { loading: false, success: true, error: null },
      }));

      setSubmissions((prev) =>
        prev.map((s) => (s.id === submission.id ? { ...s, status: "bound" } : s)),
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Binding failed.";
      setBindStates((prev) => ({
        ...prev,
        [submission.id]: { loading: false, success: false, error: msg },
      }));
    }
  };

  return {
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
  };
}

