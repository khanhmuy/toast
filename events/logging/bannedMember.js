const {EmbedBuilder, AuditLogEvent} = require('discord.js');
module.exports = {
    name: 'guildBanAdd',
    async execute(client, member) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            if (logChannel === undefined) return;

            const fetchedBan = await member.guild.fetchAuditLogs({
                limit: 1,
                type: AuditLogEvent.GuildBanAdd
            });
            const reason = fetchedBan.entries.first().reason;
            const embed = new EmbedBuilder()
                .setAuthor({name: `${member.user.username}#${member.user.discriminator}`, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}?size=1024}`})
                .setDescription(`:hammer: <@!${member.user.id}> has been banned from the server.`)
                .addFields(
                    {name: 'Reason', value: `${reason}`, inline: true},
                    {name: 'Moderator', value: `<@!${fetchedBan.entries.first().executor.id}>`, inline: true}
                )
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setColor('#f38ba8	')
                .setFooter(
                    {text: `${member.guild.name}`}
                )
                .setTimestamp();
            logChannel.send({embeds: [embed]});
        } catch (err) {
            console.log(err);
        }
    }
};