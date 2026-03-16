import styled from "styled-components";

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const FilterInput = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fbff;
  color: #1f2a44;
  font-size: 0.95rem;
  flex: 1;
  min-width: 180px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus {
    outline: none;
    border-color: #93a9c6;
    box-shadow: 0 0 0 2px rgba(147, 169, 198, 0.2);
  }
  &::placeholder {
    color: #94a3b8;
  }
`;

export const AddButton = styled.button`
  background: #5b7fb0;
  color: #ffffff;
  border: 1px solid #4f73a2;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  &:hover {
    background: #4d6f9d;
  }
`;

export const Select = styled.select`
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
