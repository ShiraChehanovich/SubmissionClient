import styled from "styled-components";

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const FilterInput = styled.input`
  padding: 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background: #111827;
  color: #f5f5f7;
  font-size: 1rem;
  flex: 1;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #9ca3af;
  }
`;

export const AddButton = styled.button`
  background: #1f2937;
  color: #f5f5f7;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #374151;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #374151;
  border-radius: 4px;
  background: #111827;
  color: #f5f5f7;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;
