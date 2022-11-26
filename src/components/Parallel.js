import * as React from 'react';
import { useMachine } from '@xstate/react';
import { asyncSequenceMachine } from '../store';

const Parallel = () => {
    const [state, send] = useMachine(asyncSequenceMachine);

    return(<div>
        <br />
        <br />
        <br />
        <br />
        <h2>{state.value}</h2>
        {JSON.stringify(state, null, 2)}
        <br />
        <button onClick={() => send('START_CHAIN')}>Raise</button>
    </div>);
};

export default Parallel;