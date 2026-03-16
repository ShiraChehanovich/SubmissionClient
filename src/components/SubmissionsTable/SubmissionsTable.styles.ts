import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  color: #1f2a44;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
`;

export const Th = styled.th`
  text-align: left;
  padding: 11px 10px;
  vertical-align: middle;
  border-bottom: 1px solid #d5e1f0;
  background: #f3f7fd;
  color: #4c617f;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const Td = styled.td`
  padding: 11px 10px;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e4edf8;

  &:last-child {
    white-space: nowrap;
    overflow: visible;
    text-overflow: initial;
  }
`;

export const Button = styled.button`
  padding: 6px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fbff;
  color: #334155;
  cursor: pointer;
  font-size: 0.84rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  &:hover {
    background: #edf4ff;
    border-color: #afc2dc;
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
