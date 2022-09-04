import * as React from 'react';
import Box from '@mui/material/Box';
import { useMachine } from '@xstate/react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from "@mui/material/StepLabel";
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { stepperMachine } from '../store';

import Typography from '@mui/material/Typography';

const StepperForm = () => {
    const [state, send] = useMachine(stepperMachine);
    const mapped = {
        firstStep: "Step 1",
        secondStep: "Step 2",
        thirdStep: "Step 3",
    };

    return <Box>
        <Stepper nonLinear activeStep={state.context.activeStep}>
            <Step key={mapped['firstStep']} completed={state.context.is1stDone}>
                <StepLabel>{mapped['firstStep']}</StepLabel>
            </Step>
            <Step key={mapped['secondStep']} completed={state.context.is2ndDone}>
                <StepLabel>{mapped['secondStep']}</StepLabel>
            </Step>
            <Step key={mapped['thirdStep']} completed={state.matches('finish')}>
                <StepLabel>{mapped['thirdStep']}</StepLabel>
            </Step>
        </Stepper>
        <Box>
            <Typography sx={{ mt: 2, mb: 1 }}>{mapped[state.value]}</Typography>
        </Box>
        {state.matches('finish') && <>
            <div style={{
                marginTop: 55,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
            }}>
                <CheckCircleOutlineIcon color='success' fontSize='large' />
                <span>Done</span>
            </div>
        </>}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {state.can({ type: 'BACK' }) && (
                <Button sx={{ mr: 1 }} color="inherit" onClick={() => send('BACK')}>
                    Back
                </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />
            {state.can('NEXT') && <Button onClick={() => send('NEXT')}>Next</Button>}
            {state.can({ type: 'COMPLETE' }) && (
                <Button onClick={() => send('COMPLETE')} sx={{ mr: 1 }}>
                    Complete Step
                </Button>
            )}
            {state.matches('thirdStep') && (
                <Button disabled={!state.can('FINISH')} onClick={() => send('FINISH')}>
                    FINISH
                </Button>
            )}
        </Box>

        <br />
        {!state.matches('finish') && <Box p={2} style={{ backgroundColor: '#eaeaea', borderRadius: 2, width: '50%', margin: '20px auto' }}>
            DEBUG: <br />
            {JSON.stringify(state.context, null, 2)}
        </Box>}
    </Box>;
};


export default StepperForm;
