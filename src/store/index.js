import { createMachine, assign } from 'xstate';
import { fetchMockedDataV2 } from '../api';

export const playerMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QAcA2BDAnmATgOjS1z1QHt0IBLAOygGIBlAVQGEWBRBhxFU2SgC6VS1HiAAeiAEwA2ABx4AzDIDsARjkBWAJyypUuVIA0ITNJna8mgAzW1mxXJmK11zQBYAvp5OFs+P2IcMApMAgxMGnoABQBBJgZ2MWQ+QWFRJAlEGVU8bXztFUVFFW13TXkTMwRFd0U8NRynUpUKuykvHxBAgIigkIgw5HQAV1hIOmiAGViATWTUoRExSQRVS2cpdW01Hbl3UqrpLSVim00LuWsdzW8u6lIIOGS+3qJ8Mgoohf4ljNBVipjKZpJoFLY7O4DEC5HJlDJvL5XuF3nhgqEUZFaD80stMqtypZXNoSvo1O5tDIoZojggOjI8BC1C5YbIZBpEd1kT00QMhqNxhAcX8VogVCprHgVDILi5XGogSpaQZLDZrPp1dpNFJGmpOTyeejBsL0qKEHVNA1rqSdRSqVIaSCEAr3IyIXJSjrxeVOkjUT0TXiAYh3HJaa4pG7bHVKdZYUDbl0eQA3UioEYAWzAeBG1AzIwEkED-yyCCBtM0rSj9h1UkU1nkeqTyNT6azeHzhaFmRSv1N+MQcjUjIlijrmkayihtPteQKKnczNKtRU+pbaczYGLZtDFes9QhOp2ignOzra-e24HdPcyssBQfj+0TjuniAA */
    createMachine({
        context: { count: 0, volume: 3 },
        id: "player",
        type: "parallel",
        states: {
            player: {
                initial: "loading",
                states: {
                    loading: {
                        entry: "loadData",
                        on: {
                            SUCCESS: {
                                actions: "assignDataLog",
                                target: "ready",
                            },
                        },
                    },
                    ready: {
                        initial: "playing",
                        states: {
                            playing: {
                                entry: [
                                    "playAudio",
                                    assign({ count: (context) => context.count + 1 }),
                                ],
                                exit: "pauseAudio",
                                on: {
                                    PAUSE: {
                                        target: "paused",
                                    },
                                },
                            },
                            paused: {
                                on: {
                                    PLAY: {
                                        target: "playing",
                                        cond: 'has3Times'
                                    },
                                },
                            },
                        },
                    },
                },
            },
            volume: {
                initial: "unmuted",
                states: {
                    unmuted: {
                        on: {
                            'VOLUME.TOGGLE': 'muted',
                        },
                    },
                    muted: {
                        on: {
                            'VOLUME.TOGGLE': 'unmuted',
                        },
                    },
                },
            },
        },
    }).withConfig({
        actions: {
            loadData: () => console.log('📦 Configured loading data'),
            assignDataLog: () => console.log('💾 Accessing data'),
            playAudio: () => console.log('🎹 🎵 Playing music'),
            pauseAudio: () => console.log('⏸️ Pausing music'),
        },
        guards: {
            has3Times: context => context.count < 3
        }
    });

export const stepperMachine = createMachine({
    id: 'stepper_machine',
    initial: 'firstStep',
    context: {
        is1stDone: false,
        is2ndDone: false,
        activeStep: 0,
    },
    on: {
        RESET: {
            target: 'firstStep'
        }
    },
    states: {
        firstStep: {
            entry: assign({ activeStep: 0 }),
            on: {
                NEXT: {
                    target: 'secondStep',
                },
                COMPLETE: {
                    target: 'secondStep',
                    actions: 'complete1stStep',
                    cond: context => !context.is1stDone
                }
            }
        },
        secondStep: {
            entry: assign({ activeStep: 1 }),
            on: {
                NEXT: {
                    target: 'thirdStep'
                },
                BACK: {
                    target: 'firstStep',
                },
                COMPLETE: {
                    target: 'thirdStep',
                    actions: 'complete2ndStep',
                    cond: context => !context.is2ndDone
                },
            },
        },
        thirdStep: {
            entry: assign({ activeStep: 2 }),
            on: {
                BACK: {
                    target: 'secondStep'
                },
                FINISH: {
                    target: 'finish',
                    cond: context => context.is1stDone && context.is2ndDone,
                }
            }
        },
        finish: {
            type: 'final'
        }
    }
}).withConfig({
    actions: {
        complete1stStep: assign({ is1stDone: true }),
        complete2ndStep: assign({ is2ndDone: true }),
    }
});

export const fetchingMachine =
    createMachine({
        id: "locations_fetcher",
        initial: "idle",
        context: {
            locations: null,
            error: null
        },
        predictableActionArguments: true,
        states: {
            idle: {
                on: { FETCH: 'loading' }
            },
            loading: {
                invoke: {
                    src: () => fetchMockedDataV2(),
                    onDone: {
                        target: "success",
                        actions: assign({ locations: (_, event) => event.data.locations })
                    },
                    onError: {
                        target: "failure",
                        actions: assign({ error: (_, event) => event.data })
                    }
                },
                on: { CANCEL: "idle" }
            },
            success: {
                on: { FETCH: "loading" }
            },
            failure: {
                on: { FETCH: "loading" }
            }
        }
    });