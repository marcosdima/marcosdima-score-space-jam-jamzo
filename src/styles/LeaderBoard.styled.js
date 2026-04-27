import styled from 'styled-components';

export const LeaderboardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
`;

export const LeaderboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 14px;
  max-width: 960px;
  max-height: 100%;
  min-width: 0;
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

export const TableContainer = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  max-height: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.primary} rgba(255, 255, 255, 0.05);
`;

export const ResultTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.typography.font};
  color: ${({ theme }) => theme.colors.text};

  thead {
    position: sticky;
    top: 0;
    background: rgba(0, 0, 0, 1);
    z-index: 10;
  }

  th {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 600;
    font-size: ${({ theme }) => theme.typography.size.small};
  }

  td {
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  tbody tr {
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
`;
