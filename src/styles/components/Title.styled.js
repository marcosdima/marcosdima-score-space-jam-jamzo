import styled from 'styled-components';

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.large};
  color: ${({ theme }) => theme.colors.text};
`;

export default Title;