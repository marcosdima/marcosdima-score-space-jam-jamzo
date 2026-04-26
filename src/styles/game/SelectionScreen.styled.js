import styled from 'styled-components';

const SelectionScreenLayout = styled.div`
  width: 100%;
  max-width: 960px;
`;

const SelectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
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
  max-height: 360px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
`;

const EmptyState = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export {
  EmptyState,
  OptionCard,
  SectionTitle,
  SelectionList,
  SelectionScreenLayout,
  SelectionTitle,
};

