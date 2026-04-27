import { useState } from 'react';
import { Button, Text, Title, LeaderboardContainer, LeaderboardContent, TableContainer, ResultTable, ButtonGroup } from '@styles';

const Leaderboard = ({ onExit }) => {
  const [results, setResults] = useState(JSON.parse(localStorage.getItem('gameResults')) || []);
 
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
            Go back to menu
          </Button>
          <Button onClick={() => {
            localStorage.removeItem('gameResults');
            setResults([]);
          }}>
            Clear leaderboard
          </Button>
        </ButtonGroup>
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
