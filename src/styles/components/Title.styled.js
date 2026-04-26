import styled from 'styled-components';

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.large};
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const SmallTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.small};
  color: ${({ theme }) => theme.colors.text};
`;
