const {EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'messageDelete',
    async execute (client, message) {
        try {
            const logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
            if (logChannel === undefined) return;
            let deleteEmbed = new EmbedBuilder()
                .setAuthor({name: message.author.username + '#' + message.author.discriminator, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`})
                .setDescription(`:wastebasket: Message deleted in <#${message.channelId}>`)
                .setColor('#f38ba8	')
                .addFields([
                    {name: 'Message', value: `${message.content}`},
                    {name: 'Message ID', value: `${message.id}`, inline: true},
                    {name: 'Author', value: `<@!${message.author.id}>`, inline: true},
                    {name: 'Author ID', value: `${message.author.id}`, inline: true}
                ])
                .setFooter({text: `${message.guild.name}`})
                .setTimestamp();
            logChannel.send({embeds: [deleteEmbed]});
        } catch (err) {}
    },
};
