const {EmbedBuilder} = require('discord.js');
const moment = require('moment');
module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${member.guild.id}.logChannel`));
            if (logChannel === undefined) return;
            const embed = new EmbedBuilder()
                .setAuthor({name: member.user.username + '#' + member.user.discriminator, iconURL: `${member.user.displayAvatarURL({ dynamic: true })}?size=1024`})
                .setDescription(`:airplane_arriving: <@!${member.user.id}> has joined the server.`)
                .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .addFields([
                    {name: 'Age of account', value: `**${moment(member.user.createdAt).format('LLLL')}\n${moment().diff(member.user.createdAt, 'years')} years ago**`}
                ])
                .setColor('#a6e3a1')
                .setFooter({text: `${member.guild.name}`})
                .setTimestamp();
            logChannel.send({embeds: [embed]});
        } catch (err) {
            console.log(err);
        }
    }
};