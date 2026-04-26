import styled from 'styled-components';

const Panel = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;


  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

export const PanelBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2%;
`;

export default Panel;
