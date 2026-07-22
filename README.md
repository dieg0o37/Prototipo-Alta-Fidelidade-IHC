# Alerta Motoboy — High-Fidelity Prototype

Interactive prototype of a **crowdsourced safety app for motoboys** (motorcycle delivery
workers), built by Team 244 for MC750 — Human-Computer Interface Design (IC/Unicamp).
Inspired by Waze, independent from delivery platforms, with real-time alerts,
community-driven validation, and a focus on accessibility (hearing-impaired riders as a
first-class use case).

## Getting started

This project requires Node.js 18+. If you already have it, skip this section. Pick the command for your distro:

**Arch Linux / Manjaro**
```bash
sudo pacman -S nodejs npm
```

**Ubuntu / Debian**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora**
```bash
sudo dnf install nodejs npm
```

**openSUSE**
```bash
sudo zypper install nodejs npm
```

> **Note:** the official repositories of some distros (especially Debian/Ubuntu) may ship outdated Node versions. If `node -v` shows a version below 18, use [nvm](https://github.com/nvm-sh/nvm) to install a newer one:
> ```bash
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
> nvm install 18
> ```

Confirm the installation with:
```bash
node -v
npm -v
```

```bash
npm install
npm run dev      # opens at http://localhost:5173
```

Production build: `npm run build` · preview the build: `npm run preview`.

## How to navigate

- The app is displayed inside a **phone frame**.
- The **button bar below the phone** (Map, Risk alert, Safe route, …) is only there to
  jump between screens and capture screenshots — **it is not part of the app**.
- **Lucas's journey** (storyboard from Phase 2), in order:
  **Map → Risk alert → (Detour) → Safe route → Validation** (Waze-style pop-up; answering
  is optional — it dismisses itself after ~6 s).
- The **day/night toggle** (sun/moon) lives in **Menu → Appearance**.
- The top of the map shows a **destination dropdown** (open by default) with an AI-generated
  summary of incidents at the location; the destination comes "synced" from the **iFood
  integration** (Menu).

## Screens (11)

| # | Screen | Requirement covered |
|---|--------|---------------------|
| 1 | Main map | real-time risk map + heat zones + destination dropdown (AI summary) |
| 2 | Quick actions "+" | report/voice/chat in just a few taps |
| 3 | Report by category | log an incident using universal icons |
| 4 | Voice command | report without taking your hands off the handlebars |
| 5 | Proximity alert | visual + haptic notification (accessibility) |
| 6 | Alternative route | detour around a risk area |
| 7 | Validation (crowdsourcing) | transient Waze-style pop-up, dismisses itself (non-blocking) |
| 8 | Silent panic | alert your support network without local sound |
| 9 | Emergency chat | pre-configured messages (hearing/speech impairments) |
| 10 | Menu + History | ride statistics, iFood integration, theme, accessibility, history + AI summary |
| 11 | Rest reminder | friendly overworking reminder (doesn't force a stop) |

## Capturing screens for the report

1. `npm run dev`.
2. Select the screen in the bottom bar (or follow Lucas's journey).
3. Toggle day/night in **Menu → Appearance** to capture both themes.
4. Capture the **phone frame** area (recommended viewport ~460×1000).

## Stack

React + Vite · CSS custom properties (theming) · lucide-react (icons). No backend.
