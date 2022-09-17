const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('make me say something stupid ig')
        .addStringOption(option => {
            return option
                .setName('message')
                .setRequired(true)
                .setDescription('Message to send')
        })
        .addChannelOption(option => {
            return option
                .setName('channel')
                .setRequired(false)
                .setDescription('Channel to send the message to')
        }),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const text = interaction.options.getString('message');
        if (channel === null) {
            interaction.channel.send(text);
            interaction.reply({content: ':white_check_mark: Message sent!', ephemeral: true});
        } else {
            channel.send(text);
            interaction.reply({content: ':white_check_mark: Message sent!', ephemeral: true});
        }
    }
};