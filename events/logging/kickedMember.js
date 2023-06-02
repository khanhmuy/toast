const {EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'guildMemberRemove',
    async execute(client, member) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            if (logChannel === undefined) return;
            const embed = new EmbedBuilder()
                .setAuthor({name: member.user.username + '#' + member.user.discriminator, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}?size=1024`})
                .setDescription(`:airplane: <@!${member.user.id}> has left the server.`)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setColor('#f9e2af')
                .setFooter({text: `${member.guild.name}`})
                .setTimestamp();
            logChannel.send({embeds: [embed]});
        } catch (err) {
        }
    }
};