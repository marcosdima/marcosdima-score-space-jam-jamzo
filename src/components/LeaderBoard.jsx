import { useState } from 'react';
import { Button, Text, Title, LeaderboardContainer, LeaderboardContent, TableContainer, ResultTable, ButtonGroup } from '@styles';
import { useI18n } from '../hooks/i18n';
import { localStorageService } from '@services';

const Leaderboard = ({ onExit }) => {
  const { buttonText } = useI18n();
  const [results, setResults] = useState(() => localStorageService.getElement('gameResults', []));
 
  const sortedResults = [...results].sort((a, b) => b.result - a.result);

  return (
    <LeaderboardContainer>
      <LeaderboardContent>
        <Title>Leaderboard</Title>
        <TableContainer>
          <ResultTable>
            <thead>
              <tr>
                <th>
                  <Text>Date</Text>
                </th>
                <th>
                  <Text>Score</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result, index) => (
                <tr key={index}>
                  <td>
                    <Text>{new Date(result.date).toLocaleString()}</Text>
                  </td>
                  <td>
                    <Text>{result.result}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </ResultTable>
        </TableContainer>
        <ButtonGroup>
          <Button onClick={onExit}>
            {buttonText('go_back_to_menu')}
          </Button>
          <Button onClick={() => {
            localStorageService.removeElement('gameResults');
            setResults([]);
          }}>
            {buttonText('clear_leaderboard')}
          </Button>
        </ButtonGroup>
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
