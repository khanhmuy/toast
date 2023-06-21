const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Connection established (${client.ws.ping}ms). Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
	},
};