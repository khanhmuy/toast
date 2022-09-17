const {EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'guildBanAdd',
    async execute(client, member) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            if (logChannel === undefined) return;
            const embed = new EmbedBuilder()
                .setAuthor(member.user.username + '#' + member.user.discriminator, `${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setDescription(`:hammer: <@!${member.user.id}> has been banned from the server.`)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setColor('#FF4046')
                .setFooter(
                    {text: `${member.guild.name}`}
                )
                .setTimestamp();
            logChannel.send({embeds: [embed]});
        } catch (err) {
        }
    }
};