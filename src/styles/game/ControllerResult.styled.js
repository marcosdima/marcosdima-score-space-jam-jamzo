import styled from 'styled-components';

export const ControllerResultLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  
  animation: slideUp 0.6s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ControllerResultList = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding-right: 4px;
`;

export const ControllerResultCard = styled.div`
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
`;
