const Vibrant = require('node-vibrant');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user')
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription('The user to get the avatar of.')
                .setRequired(false);
        })
        .addBooleanOption(option => {
            return option
                .setName('server')
                .setDescription('Whether to get the user\'s server avatar')
                .setRequired(false);
        }),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            let {jpeg, png, webp, embed, color} = '';
            const server = interaction.options.getBoolean('server');
            if (!interaction.options.getUser('user')) {
                let rawLink = '';
                if (server === true) {
                    rawLink = interaction.member.displayAvatarURL({ format: 'png', size: 1024 });
                    jpeg = rawLink.slice(0, 118) + '.jpg?size=1024';
                    png = rawLink.slice(0, 118) + '.png?size=1024';
                    webp = rawLink.slice(0, 118) + '.webp?size=1024';
                } else {
                    rawLink = interaction.user.displayAvatarURL({ format: 'png', size: 1024 });
                    jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
                    png = rawLink.slice(0, 86) + '.png?size=1024';
                    webp = rawLink.slice(0, 86) + '.webp?size=1024';
                }
                color = await Vibrant.from(png).getPalette();
                embed = new EmbedBuilder()
                    .setTitle(`Avatar of ${interaction.user.username}`)
                    .addFields([
                        {name: 'Download as', value: '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')'}
                    ])
                    .setColor(color.Vibrant.hex)
                    .setImage(png)
                    .setURL(png);
            } else {
                const user = interaction.options.getUser('user');
                let rawLink = '';
                if (server === true) {
                    const member = interaction.guild.members.cache.get(interaction.options.getUser('user').id)
                    rawLink = member.displayAvatarURL({ format: 'png', size: 1024 });
                    jpeg = rawLink.slice(0, 118) + '.jpg?size=1024';
                    png = rawLink.slice(0, 118) + '.png?size=1024';
                    webp = rawLink.slice(0, 118) + '.webp?size=1024';
                } else {
                    rawLink = user.displayAvatarURL({ format: 'png', size: 1024 });
                    jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
                    png = rawLink.slice(0, 86) + '.png?size=1024';
                    webp = rawLink.slice(0, 86) + '.webp?size=1024';
                }
                color = await Vibrant.from(png).getPalette();
                embed = new EmbedBuilder()
                    .setTitle(`Avatar of ${user.username}`)
                    .addFields([
                        {name: 'Download as', value: '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')'}
                    ])
                    .setColor(color.Vibrant.hex)
                    .setImage(png)
                    .setURL(png);
            };
            await interaction.editReply({embeds: [embed]});
        } catch (error) {
            console.log(error);
            await interaction.editReply('An error occured.');
        }
    },
};