const {EmbedBuilder, AuditLogEvent} = require('discord.js');
module.exports = {
    name: 'guildBanRemove',
    async execute(client, member) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            if (logChannel === undefined) return;

            const fetchedBan = await member.guild.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.GuildBanRemove
            });
            const embed = new EmbedBuilder()
                .setAuthor({name: `${member.user.username}#${member.user.discriminator}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}?size=1024}`})
                .setDescription(`<@!${member.user.id}> has been unbanned from the server.`)
                .addFields(
                    {name: 'Moderator', value: `<@!${fetchedBan.entries.first().executor.id}>`, inline: true}
                )
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setColor('#94e2d5')
                .setFooter({text: `${member.guild.name}`})
                .setTimestamp();
            logChannel.send({embeds: [embed]});
        } catch (err) {
            console.log(err);
        }
    }
};