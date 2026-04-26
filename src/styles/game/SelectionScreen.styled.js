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
  cursor: pointer;
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.secondary)};
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 8px;
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.bg : 'inherit')};
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
`;

const SoulsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.p`
  font-style: italic;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export {
  EmptyState,
  OptionCard,
  SectionTitle,
  SelectionScreenLayout,
  SelectionTitle,
  SoulsList
};

