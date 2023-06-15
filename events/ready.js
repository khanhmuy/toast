const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Connection established (${client.ws.ping}ms). Logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
		async function dailyWaifu() {
			const date = new Date();
			const hour = date.toLocaleString('en-AU', {timeZone: 'Australia/Queensland', hour: '2-digit', hour12: false });
			const minute = date.toLocaleString('en-AU', {timeZone: 'Australia/Queensland', minute: '2-digit' });
			if (hour === '12' && minute === '00') {
				const res = await axios.get('https://api.waifu.pics/sfw/waifu')
				let color = null
				color = await Vibrant.from(res.data.url).getPalette()
				color = color.Vibrant.hex
				const embed = new EmbedBuilder()
					.setColor(color)
					.setTimestamp()
					.setImage(res.data.url)
					.setURL(res.data.url)
				try {
					const binnyChannel = client.channels.cache.get('911174855821496330');
					binnyChannel.send({ content: '<@&911172278090367007>', embeds: [embed] });
				} catch (err) {}
			}
		}
		setInterval(dailyWaifu, 10000);
	},
};