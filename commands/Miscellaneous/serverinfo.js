const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Replies with server info.'),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const server = await interaction.guild.fetch();
            const online = server.approximatePresenceCount;
            const channels = await interaction.guild.channels.fetch();
            const roles = await interaction.guild.roles.fetch();
            const emojis = await interaction.guild.emojis.fetch();
            let color = null
            color = await Vibrant.from(server.iconURL().slice(0, 84) + '.png').getPalette()
            const embed = new EmbedBuilder()
                .setColor(color.Vibrant.hex)
                .setTitle(`${server.name}`)
                .setThumbnail(server.iconURL())
                .setDescription(`👥 **${server.memberCount}** members | <:online:957453541977514034> **${online}** online\n👤 **Owner**: <@!${server.ownerId}>\n📅 **Created at**: ${server.createdAt}\n🔒 **Security level**: ${server.verificationLevel}`)
                .addFields([
                    {name: '\u200b', value: `⌨ **${channels.size}** channels | **${roles.size}** roles | **${emojis.size}** emojis`}
                ])
                .setFooter(
                    {text: `Server ID: ${server.id}`}
                )
            await interaction.editReply({embeds: [embed], allowedMentions: { repliedUser: false }});
        } catch (error) {
            await interaction.editReply({content: 'Something went wrong, please try again later.'});
            console.log(error);
        }
    }
};