## podspeak

Podspeak makes listening to podcasts into an interactive experience by allowing users to comment on episodes. The application allows users to browse, discover, and play podcasts, drawing the most recent episodes from rss feeds and syncing comments with a database using graphQL.

See demo at: 
http://podspeak.surge.sh

* Browse podcasts.
* Search for and discover new podcasts.
* Read and leave comments on episodes.

![](screen-shots/homepage.png)

* Comments are linked to timestamp and they only load within the current minute that a podcast is being played.

* This feature allows users to engage in 'async' conversations.

![](screen-shots/player.png)

# Frontend features:
* React
* Apollo Client
* React Router
* React Transition Group

#Backend features:
* Node.js / Express
* Auth: JWT/bcrypt
* graphQL
* postgreSQL / Knex.js
* API for podcast search: Simplecast(?)
* Rss feedparser(?)

# Instructions for use

Just clone and install with npm install
