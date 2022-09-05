import React from 'react';
import Typography from '@mui/material/Typography';
import { useMachine } from '@xstate/react';
import { playerMachine } from '../store';

const Player = () => {
  const [state, send] = useMachine(playerMachine);

  return (
    <div>
      {state.matches('playing') && <Typography variant="h5" gutterBottom>
        🎶 Playing music now 😊
      </Typography>}
      {state.matches('paused') && <Typography variant="h5" gutterBottom>
        🎶 The music has paused 🛑
      </Typography>}
      {state.context.count > 0 && <div>Played times: {state.context.count}</div>}
      <br />
      {state.matches('loading') && (
        <button onClick={() => send({ type: 'SUCCESS' })}>🎵 Start playing music</button>
      )}
      {state.matches('paused') && (
        <button onClick={() => send('PLAY')}>▶️ Play</button>
      )}
      {state.matches('playing') && (
        <button onClick={() => send('PAUSE')}>⏸️ Pause</button>
      )}
    </div>
  );
};

export default Player;