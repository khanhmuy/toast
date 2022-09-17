const {PermissionsBitField, EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const moment = require('moment');
module.exports = {
    permissions: [PermissionsBitField.Flags.Administrator],
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('serverinvites')
        .setDescription('Get the server\'s invite links'),
    async execute(interaction) {
        const guild = await interaction.guild.fetch();
        const invites = await interaction.guild.invites.fetch();
        const embed = new EmbedBuilder()
            .setTitle(`Invites for ${interaction.guild.name}`)
            .setThumbnail(guild.iconURL())
            .setColor('#FFC0CB')
            .setTimestamp()
            .setFooter(
                {text: 'Last Updated'}
            )
        if (invites.size === 0) {
            embed.setDescription('No invites found.');
        } else {
            invites.forEach(invite => {
                embed.addFields([
                    {name: `${invite.code}`, value: `Uses: ${invite.uses}\nMax uses: ${invite.maxUses}\nCreated at: ${moment(invite.createdTimestamp).format('LLLL')}\nCreated by: <@!${invite.inviter.id}>\nChannel: <#${invite.channel.id}>`}
                ])
            });
        }
        interaction.reply({embeds: [embed]});
    },
};