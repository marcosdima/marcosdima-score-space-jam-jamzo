import styled from 'styled-components';

export const LanguageSwitcherContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 0.5rem;
  z-index: 100;
`;

export const LanguageButton = styled.button`
  background: ${props => props.$active 
    ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})` 
    : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.$active 
    ? 'rgba(255, 255, 255, 0.3)' 
    : 'rgba(255, 255, 255, 0.2)'};
  padding: 8px 16px;
  font-size: ${props => props.theme.typography.size.small};
  border-radius: 8px;
  font-family: ${props => props.theme.typography.font};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    background: ${props => props.$active 
    ? `linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.secondary})` 
    : 'rgba(255, 255, 255, 0.15)'};
  }

  &:active {
    transform: translateY(0);
  }
`;
