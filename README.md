# Retro Game Site

Retro Game Site is a website which allows users to search among thousands of classic
video games from famous retro game platforms from Sega Genesis to Super Nintendo.
Using multiple filters, users can narrow down their search results to find the
type of games that interest them.

This site was built primarily for my practice and learning of React, Node, API development, and MySQL.

The app is online! [You can try it here](https://retro-games-3yy4.onrender.com/). The app is run under
a free hosting plan so it might take a few seconds to start up.

## Features:
- Three new games featured daily on the home page.
- Filters to sort video games by including publisher, developer, genre, release year, and platform.
- Animated bar chart for comparing platform-specific data in either quantities or percentages.
- Image gallery, compatible with both mouse and touch devices, allows users to magnify images and zoom-in on small details.

## Technical Info:
- A custom API allows retrieval of thousands of classic video games.
- Paginated results reduce memory consumption and produce faster request times.
- Responsive layout ensures cross-browser compatibility.
- Single-page app (SPA) functionality via React Router.
- Reusable React components, including a drop-down, modal, image slider, image gallery, and bar chart.

## Stack:
- HTML5, CSS3, JavaScript ES6, React (non-class based components), Node, MySQL8
- The backend API, written in NodeJS, communicates with a MySQL database to reteive data for the client.