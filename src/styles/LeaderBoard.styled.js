import styled from 'styled-components';

export const LeaderboardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  padding: 2rem;
`;

export const LeaderboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
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
  overflow-y: auto;
  max-height: 50vh;
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
