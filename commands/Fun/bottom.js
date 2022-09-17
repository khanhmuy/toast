const { SlashCommandBuilder } = require('discord.js');
const {encode, decode} = require('bottomify');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bottom')
        .setDescription('make me say something stupid ig')
        .addSubcommand(command => command.setName('encode')
            .setDescription('encode a message')
            .addStringOption(option => {
                return option
                    .setName('text')
                    .setRequired(true)
                    .setDescription('Text to encode')
            })
        )
        .addSubcommand(command => command.setName('decode')
            .setDescription('decode a message')
            .addStringOption(option => {
                return option
                    .setName('text')
                    .setRequired(true)
                    .setDescription('Text to decode')
            })
        ),
    async execute (interaction) {
        if (interaction.options.getSubcommand() === 'encode') {
            const text = encode(interaction.options.getString('text'));
            interaction.reply({content: text});
        };
        if (interaction.options.getSubcommand() === 'decode') {
            const text = decode(interaction.options.getString('text'));
            interaction.reply({content: text});
        };
    }
};