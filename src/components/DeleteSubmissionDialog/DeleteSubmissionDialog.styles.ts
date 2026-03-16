import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(23, 33, 56, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Dialog = styled.div`
  width: 380px;
  max-width: 90vw;
  background: #ffffff;
  border: 1px solid #dbe5f3;
  border-radius: 14px;
  box-shadow: 0 14px 30px rgba(99, 115, 140, 0.2);
  padding: 22px;
  color: #1f2a44;
`;

export const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 1.15rem;
  color: #334155;
`;

export const Message = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.4;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 18px;
`;

export const Button = styled.button<{ variant?: "danger" | "secondary" }>`
  padding: 8px 14px;
  border: 1px solid;
  border-radius: 8px;
  font-size: 0.92rem;
  cursor: pointer;
  background: ${({ variant }) => (variant === "danger" ? "#e05f5f" : "#eef3f9")};
  border-color: ${({ variant }) => (variant === "danger" ? "#cf5454" : "#cbd5e1")};
  color: ${({ variant }) => (variant === "danger" ? "#ffffff" : "#334155")};

  &:hover {
    background: ${({ variant }) => (variant === "danger" ? "#c94e4e" : "#e2ebf6")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

