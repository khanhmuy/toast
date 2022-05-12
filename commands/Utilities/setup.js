const {MessageEmbed, Permissions} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    data: new SlashCommandBuilder()
        .setName('setup')
            .setDescription('Setup various functions for the bot')
            .addSubcommand(command => command.setName('logging_channel')
                .setDescription('Set the logging channel of this guild.')
                    .addBooleanOption(option => option.setName('enable')
                        .setDescription('Whether or not to enable logging.')
                        .setRequired(true))
                    .addChannelOption(option => option.setName('channel')
                        .setDescription('The channel to set as the logging channel.')
                        .setRequired(false)))
            .addSubcommand(command => command.setName('suggestion_channel')
                .setDescription('Set the suggestion channel of this guild.')
                    .addBooleanOption(option => option.setName('enable')
                        .setDescription('Whether or not to enable logging.')
                        .setRequired(true))
                    .addChannelOption(option => option.setName('channel')
                        .setDescription('The channel to set as the suggestion channel.')
                        .setRequired(false))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'logging_channel') {
            if (interaction.options.getBoolean('enable') === false) {
                interaction.client.data.set(`guild.${interaction.guild.id}.logChannel`, null);
                await interaction.reply({content: 'Logging has been disabled for this guild.', ephemeral: true});
            } else {
                if (interaction.options.getChannel('channel') === null) {
                    await interaction.reply({content: 'You must provide a channel.', ephemeral: true});
                } else {
                    const channel = interaction.options.getChannel('channel').id;
                    interaction.client.data.ensure(`guild.${interaction.guild.id}.logChannel`, channel);
                    interaction.client.data.set(`guild.${interaction.guild.id}.logChannel`, channel);
                    const replyChannel = ('<#' + interaction.client.data.get(`guild.${interaction.guild.id}.logChannel`) + '>');
                    const embed = new MessageEmbed()
                        .setTitle('Success!')
                        .setColor('GREEN')
                        .setTimestamp()
                        .setDescription(`Logging channel is now ${replyChannel}`);
                    await interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
        } if (interaction.options.getSubcommand() === 'suggestion_channel') {
            if (interaction.options.getBoolean('enable') === false) {
                interaction.client.data.set(`guild.${interaction.guild.id}.suggestionChannel`, null);
            } else {
                if (interaction.options.getChannel('channel') === null) {
                    await interaction.reply({content: 'You must provide a channel.', ephemeral: true});
                } else {
                    const channel = interaction.options.getChannel('channel').id;
                    interaction.client.data.ensure(`guild.${interaction.guild.id}.suggestionChannel`, channel);
                    interaction.client.data.set(`guild.${interaction.guild.id}.suggestionChannel`, channel);
                    const replyChannel = ('<#' + interaction.client.data.get(`guild.${interaction.guild.id}.suggestionChannel`) + '>');
                    const embed = new MessageEmbed()
                        .setTitle('Success!')
                        .setColor('GREEN')
                        .setTimestamp()
                        .setDescription(`Suggestion channel is now ${replyChannel}`);
                    await interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
        }
    },
};