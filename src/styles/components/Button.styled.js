import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: 10px 20px;
  font-size: ${props => props.theme.typography.size.medium};
  border-radius: 5px;
  font-family: ${props => props.theme.typography.font};
  
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.secondary};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Button;
