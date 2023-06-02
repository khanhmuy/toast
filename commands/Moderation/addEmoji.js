const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
    permissions: [PermissionsBitField.Flags.BanMembers],
    data: new SlashCommandBuilder()
        .setName('addemoji')
        .setDescription('Add an emoji to the server')
        .addStringOption(option => option.setName('name')
            .setDescription('The name of the emoji')
            .setRequired(true))
        .addStringOption(option => option.setName('url')
            .setDescription('The URL of the emoji')
            .setRequired(true)),
    async execute(interaction) {
        const guild = interaction.guild;
        const name = interaction.options.getString('name');
        const url = interaction.options.getString('url');
        const emoji = await guild.emojis.create({attachment: url, name: name});
        const embed = new EmbedBuilder()
            .setTitle('Emoji added!')
            .setDescription(`Emoji ${emoji} has been added to the server`)
            .setColor('#a6e3a1');
        await interaction.reply({embeds: [embed], allowedMentions: { repliedUser: false }});
    }
}