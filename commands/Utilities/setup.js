const {EmbedBuilder, SlashCommandBuilder, PermissionsBitField} = require('discord.js');
module.exports = {
    permissions: [PermissionsBitField.Flags.Administrator],
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('setup')
            .setDescription('Setup various functions for the bot')
            .addSubcommand(command => command.setName('logging')
                .setDescription('Set the logging channel of this guild.')
                    .addBooleanOption(option => option.setName('enable')
                        .setDescription('Whether or not to enable logging.')
                        .setRequired(true))
                    .addChannelOption(option => option.setName('channel')
                        .setDescription('The channel to set as the logging channel.')
                        .setRequired(false)))
            .addSubcommand(command => command.setName('suggestion')
                .setDescription('Set the suggestion channel of this guild.')
                    .addBooleanOption(option => option.setName('enable')
                        .setDescription('Whether or not to enable logging.')
                        .setRequired(true))
                    .addChannelOption(option => option.setName('channel')
                        .setDescription('The channel to set as the suggestion channel.')
                        .setRequired(false))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'logging') {
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
                    const embed = new EmbedBuilder()
                        .setTitle('Success!')
                        .setColor('#a6e3a1')
                        .setTimestamp()
                        .setDescription(`Logging channel is now ${replyChannel}`);
                    await interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
        } if (interaction.options.getSubcommand() === 'suggestion') {
            if (interaction.options.getBoolean('enable') === false) {
                interaction.client.data.set(`guild.${interaction.guild.id}.suggestionChannel`, null);
                interaction.reply('Suggestions have been disabled for this guild.');
            } else {
                if (interaction.options.getChannel('channel') === null) {
                    await interaction.reply({content: 'You must provide a channel.', ephemeral: true});
                } else {
                    const channel = interaction.options.getChannel('channel').id;
                    interaction.client.data.ensure(`guild.${interaction.guild.id}.suggestionChannel`, channel);
                    interaction.client.data.set(`guild.${interaction.guild.id}.suggestionChannel`, channel);
                    const replyChannel = ('<#' + interaction.client.data.get(`guild.${interaction.guild.id}.suggestionChannel`) + '>');
                    const embed = new EmbedBuilder()
                        .setTitle('Success!')
                        .setColor('#a6e3a1')
                        .setTimestamp()
                        .setDescription(`Suggestion channel is now ${replyChannel}`);
                    await interaction.reply({embeds: [embed], ephemeral: true});
                }
            }
        }
    },
};