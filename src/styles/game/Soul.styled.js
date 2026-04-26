import styled from 'styled-components';

const Soul = styled.div`
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'black')};
  color: ${({ $active, theme }) => ($active ? theme.colors.bg : theme.colors.text)};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.secondary)};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export default Soul;
