import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(23, 33, 56, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Dialog = styled.div`
  background: #ffffff;
  border: 1px solid #dbe5f3;
  border-radius: 14px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 14px 30px rgba(99, 115, 140, 0.2);
  color: #1f2a44;
`;

export const Title = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.4rem;
  color: #334155;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #475569;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fbff;
  color: #1f2a44;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    outline: none;
    border-color: #93a9c6;
    box-shadow: 0 0 0 2px rgba(147, 169, 198, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.92rem;
  background: ${({ variant }) => (variant === "primary" ? "#5b7fb0" : "#eef3f9")};
  color: ${({ variant }) => (variant === "primary" ? "#ffffff" : "#334155")};
  border-color: ${({ variant }) => (variant === "primary" ? "#4f73a2" : "#cbd5e1")};
  transition: background-color 0.2s ease;
  &:hover {
    background: ${({ variant }) => (variant === "primary" ? "#4d6f9d" : "#e2ebf6")};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
`;
