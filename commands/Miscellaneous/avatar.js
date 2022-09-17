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
        }),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            let {jpeg, png, webp, embed, color} = '';
            if (!interaction.options.getUser('user')) {
                const rawLink = interaction.user.displayAvatarURL({ format: 'png', size: 1024 });
                jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
                png = rawLink.slice(0, 86) + '.png?size=1024';
                webp = rawLink.slice(0, 86) + '.webp?size=1024';
                color = await Vibrant.from(png).getPalette();
                embed = new EmbedBuilder()
                    .setTitle(`Avatar of ${interaction.user.username}`)
                    .addFields([
                        {name: 'Download as', value: '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')'}
                    ])
                    .setColor(color.Vibrant.hex)
                    .setImage(interaction.user.displayAvatarURL({format:'png', size: 1024, dynamic: true}))
                    .setURL(png);
            } else {
                const user = interaction.options.getUser('user');
                const rawLink = user.displayAvatarURL({ format: 'png', size: 1024 });
                jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
                png = rawLink.slice(0, 86) + '.png?size=1024';
                webp = rawLink.slice(0, 86) + '.webp?size=1024';
                color = await Vibrant.from(png).getPalette();
                embed = new EmbedBuilder()
                    .setTitle(`Avatar of ${user.username}`)
                    .addFields([
                        {name: 'Download as', value: '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')'}
                    ])
                    .setColor(color.Vibrant.hex)
                    .setImage(user.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }))
                    .setURL(png);
            };
            await interaction.editReply({embeds: [embed]});
        } catch (error) {
            console.log(error);
            await interaction.editReply('An error occured.');
        }
    },
};