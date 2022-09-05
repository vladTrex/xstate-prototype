# README
# Basic Prototype of state machines
### State Machine examples:
1. Player Machine
2. Stepper Machine
3. Fetching Machine

### Resources:
* Basic Library -> [JavaScript State Machine](https://github.com/jakesgordon/javascript-state-machine)
* Simple Intro to FSM -> [Finite State Machine in JavaScript](https://dev.to/spukas/finite-state-machine-in-javascript-1ki1)
* XState Intro, 3 Part Series -> [Hello XState Part 1: Learning state machines for frontend web development](https://dev.to/ekafyi/hello-xstate-learning-state-machines-for-frontend-web-development-5bin)
* Intro to XState, Medium article -> [Intro to Xstate — a true state management library for react | Weekly Webtips](https://medium.com/weekly-webtips/intro-to-xstate-a-true-state-management-system-library-for-react-d8c0051c71e4)
* Video ->  [XState Docs Speedrun - 2022](https://youtu.be/2eurRx-tR-I)
* State Pattern -> [Refactoring Guru](https://refactoring.guru/design-patterns/state/typescript/example)

# XState terminology and definitions
### Actions
Entry, exit, transition actions (do actions)
XState has inline and serialized actions
### Context
Extended state, assigning via **asign(…)**
Reading from **state.context**
A car can move or stop, but at the same time, it has different attributes like color, speed, length, etc.
### Guards
Inline and Serialized guards
Multiple guarded transitions
