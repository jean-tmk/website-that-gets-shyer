# The Website That Gets Shyer

An interaction experiment that treats cursor behavior as temperament. The interface measures pointer velocity, dwell time, approach events, focus behavior, and return visits, then feeds those signals into a small trust state machine.

## What makes it more than a visual demo

- A persistent relationship model stored locally in the browser
- Pointer-velocity analysis and calm-time recovery
- A canvas particle field that reacts to proximity and trust
- Web Audio feedback with an explicit opt-in
- Keyboard-accessible interaction and a manual reduced-motion mode
- Responsive editorial interface with no UI framework
- Typed React state and strict TypeScript configuration

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Stack

React, TypeScript, Vite, Canvas 2D, Web Audio API, Local Storage, CSS.
