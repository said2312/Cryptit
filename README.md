# Cryptit

A responsive cryptocurrency tracker built with React, Redux Toolkit Query and Ant Design. See live prices, market cap and 24-hour changes for the top coins, with search and a dark/light theme.

## Screenshots

| Home (dark) | Coins list (light) | Mobile |
| --- | --- | --- |
| ![Home](screenshots/Screenshot%20(172).png) | ![Coins](screenshots/Screenshot%20(173).png) | ![Mobile](screenshots/Screenshot%202026-11-01%20204044.png) |

## Features

- Global market stats and the top 10 coins on the home page
- Full list of up to 100 coins with search by name or symbol
- Dark and light theme, remembered between visits
- Responsive layout, loading skeletons and error handling

## Tech stack

React, Redux Toolkit (RTK Query), Ant Design, React Router, and the [Coinranking API](https://coinranking.com/api).

## Getting started

You need Node.js 18+ and a free Coinranking API key (no credit card).

```bash
git clone https://github.com/said2312/Cryptit.git
cd Cryptit
npm install
```

Create a `.env` file in the project root:

```
REACT_APP_COINRANKING_KEY=your_api_key_here
```

Then start the app and open http://localhost:3000:

```bash
npm start
```

Restart the server whenever you change `.env`. The file is ignored by Git, so your key stays private.

## Data



Note: because this is a frontend-only app, the API key is visible in the browser bundle. That is fine for a personal project, but use a server proxy for production.