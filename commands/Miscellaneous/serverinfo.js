const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Replies with server info.'),
    async execute(interaction) {
        await interaction.deferReply();
        const server = await interaction.guild.fetch();
        const online = server.approximatePresenceCount;
        const channels = await interaction.guild.channels.fetch();
        const roles = await interaction.guild.roles.fetch();
        const emojis = await interaction.guild.emojis.fetch();
        let color = null
        color = await Vibrant.from(server.iconURL({format: 'png'})).getPalette()
        const embed = new MessageEmbed()
            .setColor(color.Vibrant.hex)
            .setTitle(`${server.name}`)
            .setThumbnail(server.iconURL())
            .setDescription(`š„ **${server.memberCount}** members | <:online:957453541977514034> **${online}** online\nš¤ **Owner**: <@!${server.ownerId}>\nš **Created at**: ${server.createdAt}\nš **Security level**: ${server.verificationLevel}`)
            .addField('\u200b', `āØ **${channels.size}** channels | **${roles.size}** roles | **${emojis.size}** emojis`)
            .setFooter(`Server ID: ${server.id}`);
        await interaction.editReply({embeds: [embed], allowedMentions: { repliedUser: false }});
    }
};