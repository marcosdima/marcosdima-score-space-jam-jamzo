import styled from 'styled-components';

export const FooterContainer = styled.footer`
  position: fixed;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  z-index: 1000;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.font};
  font-size: ${({ theme }) => theme.typography.size.small};
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
