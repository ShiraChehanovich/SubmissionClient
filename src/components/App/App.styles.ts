import styled, { createGlobalStyle } from "styled-components";
import type { SubmissionStatus } from "../../types/submission";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: #0b1020;
    color: #f5f5f7;
  }
`;

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 32px 16px;
`;

export const Shell = styled.div`
  width: 100%;
  max-width: 1080px;
  background: radial-gradient(circle at top left, #1f2937, #020617);
  border-radius: 24px;
  padding: 24px;
  box-shadow:
    0 24px 80px rgba(15, 23, 42, 0.9),
    0 0 0 1px rgba(148, 163, 184, 0.25);
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin: 0;
`;

export const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  color: #e5e7eb;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(129, 140, 248, 0.1));
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TextInput = styled.input`
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(15, 23, 42, 0.9);
  padding: 8px 12px;
  color: #e5e7eb;
  font-size: 13px;
  min-width: 0;
  outline: none;

  &:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.6);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Select = styled.select`
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background: rgba(15, 23, 42, 0.9);
  padding: 8px 12px;
  color: #e5e7eb;
  font-size: 13px;
  outline: none;

  &:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.6);
  }
`;

export const Card = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: radial-gradient(circle at top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.85));
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SubmissionName = styled.div`
  font-weight: 500;
  font-size: 15px;
`;

export const StatusPill = styled.span<{ status: SubmissionStatus }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border: 1px solid
    ${({ status }) => {
      switch (status) {
        case "bind_failed":
          return "rgba(248,113,113,0.8)";
        case "bound":
          return "rgba(129,140,248,0.9)";
        default:
          return "rgba(148,163,184,0.6)";
      }
    }};
  color: ${({ status }) => {
    switch (status) {
      case "bind_failed":
        return "#fecaca";
      case "bound":
        return "#c7d2fe";
      default:
        return "#e5e7eb";
    }
  }};
  background: ${({ status }) => {
    switch (status) {
      case "bind_failed":
        return "rgba(220,38,38,0.25)";
      case "bound":
        return "rgba(79,70,229,0.35)";
      default:
        return "rgba(15,23,42,0.8)";
    }
  }};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const Button = styled.button<{ variant?: "primary" | "ghost" | "danger"; loading?: boolean }>`
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 13px;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition:
    background 0.16s ease,
    border-color 0.16s ease,
    transform 0.06s ease,
    box-shadow 0.16s ease;
  opacity: ${({ loading }) => (loading ? 0.7 : 1)};

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          color: #0b1020;
          border-color: rgba(56,189,248,0.9);
          box-shadow: 0 10px 25px rgba(56,189,248,0.45);

          &:hover {
            background: linear-gradient(135deg, #0ea5e9, #4f46e5);
          }
        `;
      case "danger":
        return `
          background: rgba(220,38,38,0.1);
          color: #fecaca;
          border-color: rgba(248,113,113,0.8);

          &:hover {
            background: rgba(220,38,38,0.24);
          }
        `;
      default:
        return `
          background: rgba(15,23,42,0.9);
          color: #e5e7eb;
          border-color: rgba(148,163,184,0.6);

          &:hover {
            background: rgba(17,24,39,0.9);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    box-shadow: none;
  }
`;

export const StatusDot = styled.span<{ color: string }>`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({ color }) => color};
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.9), 0 0 12px ${({ color }) => color};
`;

export const HelperText = styled.div`
  font-size: 11px;
  color: #9ca3af;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
`;

export const Empty = styled.div`
  font-size: 13px;
  color: #9ca3af;
  padding: 12px;
  border-radius: 12px;
  border: 1px dashed rgba(148, 163, 184, 0.6);
  background: rgba(15, 23, 42, 0.7);
`;

export const ErrorBanner = styled.div`
  border-radius: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(248, 113, 113, 0.8);
  background: rgba(248, 113, 113, 0.12);
  color: #fecaca;
  font-size: 13px;
`;

export const SuccessText = styled.span`
  font-size: 12px;
  color: #bbf7d0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #d1d5db;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const RequiredStar = styled.span`
  color: #fb7185;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
`;

export const InlineError = styled.div`
  font-size: 11px;
  color: #fecaca;
`;

