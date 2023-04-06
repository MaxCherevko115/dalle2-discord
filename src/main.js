const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const functionsFiles = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'))
const commandsFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))
const eventsFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'))

client.commands = new Collection();

(async () => {
	for(file of functionsFiles) {
		require(`./functions/${file}`)(client)
	}
	client.handleEvents(eventsFiles, './src/events')
	client.handleCommands(commandsFiles, './src/commands')
	client.login(process.env.DISCORD_TOKEN)
})();