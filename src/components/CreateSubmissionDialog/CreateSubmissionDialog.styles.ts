import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Dialog = styled.div`
  background: #1f2937;
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  color: #f5f5f7;
`;

export const Title = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background: #111827;
  color: #f5f5f7;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ variant }) => (variant === "primary" ? "#3b82f6" : "#374151")};
  color: #f5f5f7;
  &:hover {
    background: ${({ variant }) => (variant === "primary" ? "#2563eb" : "#4b5563")};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
`;
