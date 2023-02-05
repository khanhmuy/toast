# toast
[eider_hmuy](https://github.com/khanhmuy/eider_hmuy) rewrite from scratch, now with slash commands :skull:
## Developing
- Create a .env file with the following contents:
```
DISCORD_TOKEN=YOUR_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
GUILD_ID=YOUR_GUILD_ID
```
- Run `node deploy_guild_commands.js` to deploy guild application commands.
- Start the bot with `node index.js`.
- Optionally, you can install `nodemon` for automatic restarts.
## Deploying
- Create a .env file with the following contents:
```
DISCORD_TOKEN=YOUR_TOKEN
CLIENT_ID=YOUR_CLIENT_ID
NASA_API_KEY=NASA_APOD_API_KEY
```
- Run `node deploy_global_commands.js` to deploy global application commands.
- Start the bot with `node index.js`.
- Optionally, you can install `pm2` for process management.