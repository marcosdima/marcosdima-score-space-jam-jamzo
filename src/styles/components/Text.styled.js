import styled from 'styled-components';

const Text = styled.p`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export default Text;
