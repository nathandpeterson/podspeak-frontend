# **PODSPEAK**

Podspeak makes listening to podcasts into an interactive experience by allowing users to comment on episodes in a twitter-like feed. The application allows users to browse, discover, and play podcasts, drawing the most recent episodes from rss feeds and syncing comments with a database using graphQL.

Check out a live demo: [podspeak](http://podspeak.surge.sh)

![](homepage.png)

* Browse podcasts.
* Search for and discover new podcasts using ListenNotes API.
* Read and leave comments on episodes.

![](episode-browser.png)

* Comments are linked to timestamp and they only load within the current minute that a podcast is being played.
* This feature allows users to engage in 'async' conversations.

![](Mobile.png)

<a href="https://youtu.be/IICWJmZORew" target="_blank"><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

# Frontend features:
* React
* Apollo Client
* React Router
* PubSub-JS
* Materialize CSS
* React-player

#Backend features:
* Node.js / Express
* Auth: JWT/bcrypt
* graphQL
* postgreSQL / Knex.js
* API for podcast search: ListenNotes
* RSS feedparser

# Instructions for use

Just clone down the frontend from this repo and install with npm install. If you want to check out the backend, take a look at [https://github.com/nathandpeterson/podspeak-api].
