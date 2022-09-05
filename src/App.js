import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Map from './components/Map';
import StepperForm from './components/Stepper';
import { a11yProps } from './utils';
import TabPanel from './components/TabPanel';
import MainList from './components/List';
import TableSkeleton from './components/TableSkeleton';
import Player from './components/Player';
import { fetchingMachine } from './store';
import './App.css';

function App() {
  const [state, send] = useMachine(fetchingMachine);
  const [activeTrain, setActiveTrain] = useState(undefined);
  const [value, setValue] = useState(0);
  const { locations } = state.context;
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    send('FETCH');
  }, [send]);

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Multi-Step machine" {...a11yProps(0)} />
          <Tab label="Player Machine" {...a11yProps(1)} />
          <Tab label="Fetching Machine" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <StepperForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Player />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {state.matches("loading") && <TableSkeleton />}
              {state.matches('success') && (
                <MainList
                  onLocationClick={item => setActiveTrain(item)}
                  locations={locations}
                />
              )}
              {
                state.matches("failure") && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={10}
                  >
                    <ErrorOutlineIcon color="error" />
                    <Typography variant="h5" gutterBottom>
                      Something went wrong with list fetching
                    </Typography>
                  </Box>
                )
              }
            </Grid>
            <Grid item xs={4}>
              <Box pt={2}>
                {Boolean(activeTrain) ?  <Map train={activeTrain} /> : 'No data'}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
    </div>
  );
}

export default App;
