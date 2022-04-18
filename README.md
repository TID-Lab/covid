# COVID-19 Social Media Dashboard

This repo contains the source code for the [Project PEACH](https://www.projectpeach.org/) COVID-19 Social Media Dashboard: a dashboard intended to support the real-time monitoring of publicly available online COVID-19 posts across Facebook, Twitter, and Instagram by health-focused social sector organizations in the state of Georgia.

![Screenshot](./assets/screenshot.png)

The dashboard is actively developed by the [Technology & International Development Lab](http://tid.gatech.edu) at Georgia Tech in collaboration with Emory University & the Morehouse School of Medicine.

## Architecture Overview

<html>
  <img style='margin-left: auto; margin-right: auto; display: block; margin-top: 30px; margin-bottom: 30px;' src='./assets/diagram.png' alt='Dashboard Architecture'>
</html>

This dashboard is composed of two [Node.js](https://nodejs.org) applications that commmunicate via a shared [MongoDB](https://mongodb.com) database.

`fetch` is a [Downstream](https://github.com/TID-Lab/downstream) app that aggregates and annotate social media posts across Facebook, Twitter, and Instagram in real-time and stores them in the database. For example, posts are annotated with various COVID-19 related tags (testing, vaccines, variants, etc.) based on their textual content.

`server` is an [Express](https://expressjs.com/) app that hosts both a client-side [React](https://reactjs.org/) application in production and a server-side RESTful web API that queries the database based on user input.

Both applications...
- interface with the database through the [Mongoose](https://mongoosejs.com/) model layer.
- are managed in production using [PM2](https://pm2.keymetrics.io/).
- pull their secrets & API keys from a shared [.env](https://www.npmjs.com/package/dotenv) file located at the project root folder.

### Folder Structure

- `fetch/` - Contains the source code for the `fetch` application.
- `server/` - Contains the source code for the `server` application.
- `client/`
  - In *development*, this folder contains the source code for a self-hosted version of the client-side React application that comes with a bunch of goodies that you'll want to use (like hot module reloading). All client-side requests are proxied to the RESTful web API hosted by the server.
  - In *production*, this folder contains a `build/` folder that stores a bundled & optimized version of the React app which is served up as static files by the `server`.
- `assets/` - Contains image files for this README :-)

## Development Environment

### Installation

1. Clone this repository on your local machine.

2. Download the [MongoDB Community](https://mongodb.com) server to your computer.

3. Install [nvm](https://github.com/nvm-sh/nvm). We'll use this to install Node.js properly in the next step.

4. Install [ngrok](https://ngrok.com/). First you will have to create an account and then do the basic setup on their page. We'll use `ngrok` to open our localhost to the internet on an HTTPS-based web address. Both HTTPS and a public web address are neccessary for Twitter Oauth to work.

5. Open a terminal and `cd` to your clone of this repository. From there, run `nvm install` to install the right version of Node.js onto your machine.

6. Run `npm install` in  the `fetch/`, `server/`, and `client/` folders to install their respective dependencies.

7. You're done! I'm proud of you. 😁👍

### Setup

Create an empty `.env` file in the root folder for this repo and add the following environment variables using the [dotenv](https://www.npmjs.com/package/dotenv) format:

- `TWITTER_ACCESS_TOKEN` - A Twitter access token; required for Twitter API access.
- `TWITTER_ACCESS_TOKEN_SECRET` - A Twitter access token secret; required for Twitter API access.
- `TWITTER_CONSUMER_KEY` - A Twitter consumer key; required for Twitter API access.
- `TWITTER_CONSUMER_SECRET` - A Twitter consumer secret; required for Twitter API access.
- `CROWDTANGLE_INSTAGRAM_TOKEN` - A CrowdTangle Instagram dashboard token.
- `CROWDTANGLE_FACEBOOK_TOKEN` - A CrowdTangle Facebook dashboard token.
- `FACEBOOK_ACCESS_TOKEN` - A Facebook access token for their oEmbed API.
- `INSTAGRAM_ACCESS_TOKEN` - An Instagram access token for their oEmbed API.
- `SESSION_SECRET` - An alphanumeric secret string used to secure user sessions; should be random.
- `STORE_SECRET` - An alphanumeric secret string used to encrypt user session information in the database; should be random.
- `CALLBACK_URL` - The callback URL used for Oauth. This is only needed for local testing. If not specified, our live website's URL is given.

### Running

Running the dashboard in development requires starting up three separate Node.js applications and opening our local-host to the internet with ngrok for Twitter to recognize.

Open up four terminal windows or tabs, and then execute the commands below in the order they are listed, one to each terminal. In each case, make sure to `cd` into the corresponding folder first.

1. Run the `ngrok` proxy to reroute localhost onto a secure web address
    - On Mac/Linux, run `./ngrok http http://localhost:3000   --host-header="localhost:3000"`
    - On Windows, run `ngrok.exe http http://localhost:3000 --host-header="localhost:3000"`
    - Everytime you must update `CALLBACK_URL` in .env and your Twitter developer callbacks with the newly generated ngrok URL in HTTPS. The URL will look something like `https://fcd6-128-61-35-51.ngrok.io`.
3. Run the `fetch` app with `npm run dev`
4. Run the `server` app with `npm run dev`\*
5. Run the `client` app with `npm start`

\* A default admin user with the name `Georgia Tech` and password `letmein1` will be created when you run the `server` app for the first time.

## Maintenance

To do any maintenance on the production deployment of the dashboard, SSH into the virtual machine where the production dashboard is being hosted first.

### PM2 Command Glossary

This project uses [PM2](https://pm2.keymetrics.io/) to manage its Node.js applications in production. Below is a handy glossary of important PM2 commands that you'll want in your maintenance tool belt.

<html>
  <table>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code>pm2 start &lt;process&gt;</code></td>
      <td>Starts a process.</td>
    </tr>
    <tr>
      <td><code>pm2 stop &lt;process&gt;</code></td>
      <td>Stops a process.</td>
    </tr>
    <tr>
      <td><code>pm2 restart &lt;process&gt;</code></td>
      <td>Stops <i>and</i> starts a process.</td>
    </tr>
    <tr>
      <td><code>pm2 status</code></td>
      <td>Reports the status (e.g. active, stopped, erroring) of all processes.</td>
    </tr>
    <tr>
      <td><code>pm2 logs &lt;process&gt;</code></td>
      <td>Prints out the recent logs from a process.</td>
    </tr>
  </table>
</html>

For all commands above, your options for `<process>` are:
- `fetch`
- `server`

These processes are the two Node.js applications described above at the top of the [Architecture Overview](#architecture-overview) section.

### Upgrading the dashboard

You've made changes to the source code, and now you want to apply those changes to the deployed dashboard. Depending on where you made your changes, you'll need to run different commands.

First, make sure that you've pushed those changes to this GitHub repo, and then pulled them down on the production VM with `git pull`.

**If you made changes...**

- in the `client/` folder, **do nothing**. There should be a git hook on the production VM that automatically builds the client-side React application for you with the new code. If you're paranoid, just run `npm run build` from the `client/` folder to manually build the React app.

- in the `fetch/` folder, run `pm2 restart fetch`.

- in the `server/` folder, run `pm2 restart server`.

And that's it. You've upgraded the dashboard! Woo woo 🎉

### Testing out the `fetch` application

If you're going to test out new changes that you've made to the `fetch` application locally *and* you intend on pulling in live data to play with, beware that you'll need to temporarily stop the production `fetch` app in order to stay under the API rate limits for each social media platform. Otherwise, both your local `fetch` app and the production instance will probably trigger those rate limits, and then neither will be able to pull in data.

**In some cases, one way to avoid this problem is to just play with existing data.** You'll have to get creative with simulating the production environment, but your development cycle will be much faster as a result!


## License

This project is licensed under the [GNU GPLv3](./LICENSE) license.






