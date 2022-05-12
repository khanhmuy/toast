const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Replies with server info.'),
    async execute(interaction) {
        const server = await interaction.guild.fetch()
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
            .setDescription(`👥 **${server.memberCount}** members | <:online:957453541977514034> **${online}** online\n👤 **Owner**: <@!${server.ownerId}>\n📅 **Created at**: ${server.createdAt}\n🔒 **Security level**: ${server.verificationLevel}`)
            .addField('\u200b', `⌨ **${channels.size}** channels | **${roles.size}** roles | **${emojis.size}** emojis`)
            .setFooter(`Server ID: ${server.id}`);
        await interaction.reply({embeds: [embed], allowedMentions: { repliedUser: false }});
    }
};