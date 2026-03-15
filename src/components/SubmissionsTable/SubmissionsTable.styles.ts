import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #f5f5f7;
`;

export const Th = styled.th`
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #374151;
`;

export const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #374151;
`;

export const Button = styled.button`
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  background: #d86b6b70;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  &:hover {
    background: #d86b6b90;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
