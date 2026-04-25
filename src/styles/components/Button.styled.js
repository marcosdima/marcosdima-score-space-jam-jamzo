import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 10px 20px;
  font-size: ${props => props.theme.typography.size.medium};
  
  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
