import React from 'react';
import Typography from '@mui/material/Typography';
import { useMachine } from '@xstate/react';
import { playerMachine } from '../store';

const Player = () => {
  const [state, send] = useMachine(playerMachine);

  return (
    <div>
      {state.matches('player.playing') && <Typography variant="h5" gutterBottom>
        πΆ Playing music now π
      </Typography>}
      {state.matches('player.paused') && <Typography variant="h5" gutterBottom>
        πΆ The music has paused π
      </Typography>}
      {state.context.count > 0 && <div>Played times: {state.context.count}</div>}
      <br />
      {state.matches('player.loading') && (
        <button onClick={() => send({ type: 'SUCCESS' })}>π΅ Start playing music</button>
      )}
      {state.matches('player.ready.paused') && (
        <button onClick={() => send('PLAY')}>βΆοΈ Play</button>
      )}
      {state.matches('player.ready.playing') && (
        <button onClick={() => send('PAUSE')}>βΈοΈ Pause</button>
      )}
    </div>
  );
};

export default Player;