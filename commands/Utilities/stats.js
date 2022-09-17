const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Shows the bot\'s statistics.'),
    async execute(interaction) {
        let color = null;
        color = await Vibrant.from(interaction.client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })).getPalette();
        color = color.Vibrant.hex;
        const embed = new MessageEmbed()
            .setTitle(`Hi! I\'m ${interaction.client.user.username}`)
            .setColor(color)
            .setThumbnail(interaction.client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))  
            .addFields(
                { name: '🏠 Servers I\'m In', value: `${interaction.client.guilds.cache.size}`, inline: true },
                { name: '👥 Members I\'m Serving', value: `${interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`, inline: true },
                { name: '👥 Members in this guild', value: `${interaction.guild.memberCount}`, inline: true },
                { name: '💬 Total Received Messages', value: `${interaction.client.data.get('msgCounterTotal')}`, inline: true },
                { name: '🤖 Total Received Commands', value: `${interaction.client.data.get('cmdCounterTotal')}`, inline: true },
            )
            .setTimestamp()
            .setFooter('Last Refreshed');
        interaction.reply({ embeds: [embed] });
    },
};