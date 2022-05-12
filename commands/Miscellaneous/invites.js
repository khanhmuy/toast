const {Permissions, MessageEmbed} = require('discord.js');
const moment = require('moment');
const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
    permissions: [Permissions.FLAGS.ADMINISTRATOR],
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('serverinvites')
        .setDescription('Get the server\'s invite links'),
    async execute(interaction) {
        const guild = await interaction.guild.fetch();
        const invites = await interaction.guild.invites.fetch();
        const embed = new MessageEmbed()
            .setTitle(`Invites for ${interaction.guild.name}`)
            .setThumbnail(guild.iconURL())
            .setColor('BLUE')
            .setTimestamp()
            .setFooter('Last Updated')
        if (invites.size === 0) {
            embed.setDescription('No invites found.');
        } else {
            invites.forEach(invite => {
                embed.addField(`${invite.code}`, `Uses: ${invite.uses}\nMax uses: ${invite.maxUses}\nCreated at: ${moment(invite.createdTimestamp).format('LLLL')}\nCreated by: <@!${invite.inviter.id}>\nChannel: <#${invite.channel.id}>`)
            });
        }
        interaction.reply({embeds: [embed]});
    },
};