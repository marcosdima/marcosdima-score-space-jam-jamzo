import { useEffect, useState } from 'react';
import { Button, Text, Title, LeaderboardContainer, LeaderboardContent, TableContainer, ResultTable, ButtonGroup } from '@styles';
import { useI18n } from '../hooks/i18n';
import { clearScores, getLocalScores, getOnlineScores } from '@services';
 
const ScoreTable = ({ scores, emptyText }) => (
  <TableContainer>
    <ResultTable>
      <thead>
        <tr>
          <th>
            <Text>{emptyText.usernameLabel}</Text>
          </th>
          <th>
            <Text>{emptyText.dateLabel}</Text>
          </th>
          <th>
            <Text>{emptyText.scoreLabel}</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {scores.length === 0 ? (
          <tr>
            <td colSpan={3}>
              <Text>{emptyText.emptyMessage}</Text>
            </td>
          </tr>
        ) : scores.map((result, index) => (
          <tr key={`${result.username}-${result.created_at}-${index}`}>
            <td>
              <Text>{result.username}</Text>
            </td>
            <td>
              <Text>{new Date(result.created_at).toLocaleString()}</Text>
            </td>
            <td>
              <Text>{result.score}</Text>
            </td>
          </tr>
        ))}
      </tbody>
    </ResultTable>
  </TableContainer>
);

const PanelStatus = ({ title, loading, error, loadingText, errorText }) => {
  const message = error
    ? errorText
    : loading
      ? loadingText
      : title;

  return (
    <div style={{ minHeight: 28, display: 'flex', alignItems: 'center' }}>
      <Text>{message}</Text>
    </div>
  );
};

const Leaderboard = ({ onExit }) => {
  const { t, buttonText } = useI18n();
  const [refreshCooldown, setRefreshCooldown] = useState(0);

  // Scores.
  const [localScores, setLocalScores] = useState(() => getLocalScores());
  const [onlineScores, setOnlineScores] = useState([]);

  // Flags.
  const [onlineLoading, setOnlineLoading] = useState(false);
  const [onlineError, setOnlineError] = useState(false);

  useEffect(() => {
    if (refreshCooldown <= 0) return;

    const timeoutId = window.setTimeout(() => {
      setRefreshCooldown((currentValue) => Math.max(0, currentValue - 1));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [refreshCooldown]);

  const handleRefresh = async () => {
    if (refreshCooldown > 0) return;
    if (onlineError) setOnlineError(false);

    setRefreshCooldown(15);
    setOnlineLoading(true);
    try {
      const onlineScoresResult = await getOnlineScores();
      setOnlineScores(onlineScoresResult);
    } catch {
      setOnlineError(true);
    } finally {
      setOnlineLoading(false);
    }
  };

  const handleClearScores = () => {
    clearScores();
    setLocalScores([]);
  };

  const isRefreshDisabled = refreshCooldown > 0 || onlineLoading;
  const refreshLabel = refreshCooldown > 0
    ? `${t('buttons.refresh')} (${refreshCooldown})`
    : t('buttons.refresh');

  return (
    <LeaderboardContainer>
      <LeaderboardContent>
        <Title>{t('leaderboard.title')}</Title>
        <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', width: '100%', minHeight: 0, flex: 1 }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Text>{t('leaderboard.local_scores')}</Text>
            <ScoreTable
              scores={localScores}
              emptyText={{
                usernameLabel: t('leaderboard.username'),
                dateLabel: t('leaderboard.date'),
                scoreLabel: t('leaderboard.score'),
                emptyMessage: t('leaderboard.no_local_scores_yet'),
              }}
            />
            <ButtonGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={handleClearScores} style={{ width: '100%' }} disabled={localScores.length === 0}>
                {buttonText('clear_leaderboard')}
              </Button>
            </ButtonGroup>
          </div>

          <div style={{ flex: 1, minWidth: 0, minHeight: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <PanelStatus
              title={t('leaderboard.online_scores')}
              loading={onlineLoading}
              error={onlineError}
              loadingText={t('leaderboard.loading_scores')}
              errorText={t('leaderboard.unable_to_load_online_scores')}
            />
            <ScoreTable
              scores={onlineScores}
              emptyText={{
                usernameLabel: t('leaderboard.username'),
                dateLabel: t('leaderboard.date'),
                scoreLabel: t('leaderboard.score'),
                emptyMessage: t('leaderboard.no_online_scores_yet'),
              }}
            />
            <ButtonGroup style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={handleRefresh} disabled={isRefreshDisabled} style={{ width: '100%' }}>
                {refreshLabel}
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <ButtonGroup style={{ width: '100%' }}>
          <Button onClick={onExit} style={{ width: '100%' }}>
            {buttonText('go_back_to_menu')}
          </Button>
        </ButtonGroup>
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
