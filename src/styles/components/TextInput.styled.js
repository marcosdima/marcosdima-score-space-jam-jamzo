import styled from 'styled-components';

const TextInput = styled.input`
  flex: 1;
  min-width: 0;
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.medium};
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.12);
  }
`;

export default TextInput;
