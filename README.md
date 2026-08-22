# The Website That Gets Shyer

> A typed React experiment whose interface develops trust in the visitor’s cursor.

**Live exhibit:** https://jean-tmk.github.io/website-that-gets-shyer/

## What it is

Most interfaces demand attention. This one has boundaries. It retreats from fast approaches, recovers during calm pauses, remembers respectful visits, and gradually becomes easier to reach. The project is a playful study of consent, patience, and non-human temperament in interaction design.

## What a visitor can do

1. Approach slowly and let the site observe the cursor.
2. Pause nearby instead of chasing it.
3. Use the offered interaction when trust is high enough.
4. Return later to see the locally stored relationship continue.

## How it works

- TypeScript defines the trust state machine, pointer telemetry, behavioral events, persistence model, and React component contracts.
- React renders the changing relationship and keeps visual state synchronized with trust.
- Canvas 2D supplies the responsive particle field; Web Audio supplies optional feedback.
- Vite creates the static GitHub Pages build.

## Repository map

| Path | What it does |
|---|---|
| `.github/workflows/deploy.yml` | GitHub Actions workflow that validates, builds, and/or deploys the exhibit. |
| `index.html` | The deployable HTML shell: metadata, accessible structure, controls, and script/style entry points. |
| `package.json` | Dependency versions and local development/build scripts. |
| `src/main.tsx` | Browser/application source for the behavior named by this file. |
| `src/styles.css` | The primary responsive visual system. |
| `src/vite-env.d.ts` | Browser/application source for the behavior named by this file. |
| `tsconfig.json` | Strict TypeScript compiler settings. |
| `vite.config.ts` | Vite build and relative deployment configuration. |
| `public/`, `public/pip/` | 5 production illustration/icon files loaded by the live interface. |
| `polyglot/` | 58 isolated language-atlas files plus the majority registry and manifest; these never load in the visible frontend. |

## Languages and why they are here

Percentages below are calculated from the byte counts currently returned by GitHub Linguist. Tiny language-atlas modules are intentionally isolated from the production frontend.

| Language | GitHub | Role |
|---|---:|---|
| TypeScript | 90.1% | the majority typed behavior and React application |
| HTML | 0.2% | the Vite mount shell |
| KerboScript | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| OCaml | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| mIRC Script | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| BitBake | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Inno Setup | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Liquidsoap | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| LiveScript | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| OverpassQL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| PowerShell | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| PureScript | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Asymptote | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Lex | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Clojure | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Gnuplot | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| NetLogo | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Nushell | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Omgrofl | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Verilog | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Chapel | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Csound | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| FreeMarker | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Rascal | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| WebIDL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| JavaScript | 0.2% | generated/browser support where reported |
| Jolie | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Lasso | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Metal | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Quint | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Raku | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| AMPL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| CWeb | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| GAMS | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| HLSL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Hack | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| MQL5 | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| NASL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Pact | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Self | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| SmPL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| BQN | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Elm | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| IDL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Jac | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| R | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| SQF | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| TLA | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| Uno | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| ZIL | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| C# | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| DM | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |
| XS | 0.2% | an isolated language-atlas adapter used to broaden the comparative polyglot collection without changing the exhibit UI |

### About the language atlas

Where present, `polyglot/language-atlas.json` is the machine-readable index of the languages assigned to this repository. `polyglot/languages/` contains one small, independent signature module per assignment, and `polyglot/majority/` contains the larger registry that preserves the intended majority language. These files are documentation and comparative code specimens: the live site does not download or execute them.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:8000` unless the framework development server prints a different local address.

## Privacy and access

- No sign-in is required.
- No API key is required for the live exhibit.
- No visitor text is sent to an AI service.
- Any saved progress stays in local browser storage unless the README explicitly describes an optional external architecture.
- Sound begins only after a user gesture where browser autoplay rules require it.

## Deployment

The public version is a static GitHub Pages deployment. The workflow in `.github/workflows/` is the source of truth for its exact build and publish steps. The favicon is stored with the deployed app so browser tabs and bookmarks use the project’s own mark.
