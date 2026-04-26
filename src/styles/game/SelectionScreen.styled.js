import styled from 'styled-components';
import Panel from '../containers/Panel.styled.js';

const SelectionScreenLayout = styled.div`
  width: 100%;
  max-width: 960px;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const SelectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
  flex-shrink: 0;
`;

const SelectionSplitRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
  min-height: 0;
  margin-bottom: 12px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SelectionPanel = styled(Panel)`
  height: 100%;
  margin-bottom: 0;
  min-height: 0;
`;

const ActionPanel = styled(Panel)`
  flex-shrink: 0;
  margin-bottom: 0;
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 10px 0;
`;

const OptionCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid
    ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.secondary};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) => ($active ? theme.colors.bg : 'inherit')};
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
`;

const SelectionList = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
`;

const EmptyState = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export {
  ActionPanel,
  EmptyState,
  OptionCard,
  SectionTitle,
  SelectionList,
  SelectionPanel,
  SelectionScreenLayout,
  SelectionSplitRow,
  SelectionTitle,
};

