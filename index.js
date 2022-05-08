const { Client, Collection, Intents } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const Enmap = require('enmap');
const { Server } = require('http');

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
async function error(err) {
	console.log(chalk.redBright(err));
	await sleep(200);
	process.exit(0);
}

require('dotenv').config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES] });

client.commands = new Collection();
client.data = new Enmap({
	name: 'data',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
});
console.log(client.data)

const commandFolders = fs.readdirSync('./commands');
const loggingFiles = fs.readdirSync('./events/logging').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

console.log('--Events--')
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    console.log(chalk.hex('#808080')('Loaded event ') + chalk.hex('#3c850c')(`${file} - ${require(`./events/${file}`).name} event`));
}

console.log('--Logging--');
for (const file of loggingFiles) {
	const event = require(`./events/logging/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
	console.log(chalk.hex('#808080')('Loaded event ') + chalk.hex('#3c850c')(`${file} - ${require(`./events/logging/${file}`).name} event`));
}

console.log('--Commands--')
for (const folder of commandFolders) {
    if (folder.endsWith('.js')) {
        console.log(chalk.red(`File (${folder}) not in subdirectory, please move it. File has been ignored.`));
        return;
    }
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
        console.log(chalk.hex('#808080')('Loaded command ') + chalk.hex('#3c850c')(`${file} - ${require(`./commands/${folder}/${file}`).data.name}`));
    }
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(client.token);