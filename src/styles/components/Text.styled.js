import styled from 'styled-components';

export const Text = styled.p`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const SmallText = styled(Text)`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.small};
  color: ${({ theme }) => theme.colors.text};
`;
