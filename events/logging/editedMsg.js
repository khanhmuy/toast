const {EmbedBuilder} = require('discord.js');
module.exports = {
    name: 'messageUpdate',
    async execute (client, message) {
        try {
            try {
                if (embedType === 'image' || 'video') {};
                const embedType = message.reactions.message.embeds[1].type;
            } catch {}
            const logChannel = client.channels.cache.get(client.data.get(`guild.${message.guild.id}.logChannel`));
            if (logChannel === undefined) return;
            let deleteEmbed = new EmbedBuilder()
                .setAuthor({name: message.author.username + '#' + message.author.discriminator, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}?size=1024`})
                .setDescription(`:pencil2: Message edited in <#${message.channelId}>. [Jump to message](https://discordapp.com/channels/${message.guild.id}/${message.channelId}/${message.id})`)
                .setColor('#94e2d5')
                .addFields([
                    {name: 'Before', value: `${message.content}`},
                    {name: 'After', value: `${message.reactions.message.content}`},
                    {name: 'Message ID', value: `${message.id}`, inline: true},
                    {name: 'Author', value: `<@!${message.author.id}>`, inline: true},
                    {name: 'Author ID', value: `${message.author.id}`, inline: true}
                ])
                .setFooter({text: `${message.guild.name}`})
                .setTimestamp();

            if (message.author.bot == true) return;
            const embeds = message.reactions.message.embeds;
            if (embeds.length == 0) {
                logChannel.send({embeds: [deleteEmbed]});
            } else {
                embeds.forEach(embed => {
                    if (embed.data.type == 'rich' || 'image' || 'video') return
                    else {
                        logChannel.send({embeds: [deleteEmbed]});
                    }
                })
            }
        } catch (err) {}
    },
};