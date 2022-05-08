require('dotenv').config();
const chalk = require('chalk');
const fs = require('node:fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [];
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	if (folder.endsWith('.js')) {
        console.log(chalk.red(`File (${folder}) not in subdirectory, please move it. File has been ignored.`));
        return;
    }
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
		commands.push(command.data.toJSON());
        console.log(chalk.hex('#808080')('Registered command ') + chalk.hex('#3c850c')(`${file} - ${require(`./commands/${folder}/${file}`).data.name}`));
    }
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);