const Vibrant = require('node-vibrant');
const { MessageEmbed } = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
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
                color = await Vibrant.from(interaction.user.displayAvatarURL({ format: 'png', size: 1024 })).getPalette();
                jpeg = interaction.user.displayAvatarURL({ format: 'jpeg', dynamic: true, size: 1024 });
                png = interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
                webp = interaction.user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 });
                embed = new MessageEmbed()
                    .setTitle(`Avatar of ${interaction.user.username}`)
                    .addField('Download as', '[jpeg](' + jpeg + ') | [png](' + png + ') | [webp](' + webp + ')')
                    .setColor(color.Vibrant.hex)
                    .setImage(interaction.user.displayAvatarURL({size: 1024, dynamic: true}))
                    .setURL(png);
            } else {
                const user = interaction.options.getUser('user');
                color = await Vibrant.from(user.displayAvatarURL({ format: 'png', size: 1024 })).getPalette();
                const rawLink = user.displayAvatarURL({ format: 'png', size: 1024 });
                console.log(rawLink);
                jpeg = rawLink.slice(0, 86) + '.jpg?size=1024';
                png = rawLink.slice(0, 86) + '.png?size=1024';
                webp = rawLink.slice(0, 86) + '.webp?size=1024';
                embed = new MessageEmbed()
                    .setTitle(`Avatar of ${user.username}`)
                    .addField('Download as', `[jpeg](${jpeg}) | [png](${png}) | [webp](${webp})`)
                    .setColor(color.Vibrant.hex)
                    .setImage(user.displayAvatarURL({ format: 'png', size: 1024 }))
                    .setURL(png);
            };
            await interaction.editReply({embeds: [embed]});
        } catch (error) {
            console.log(error);
            await interaction.editReply('An error occured.');
        }
    },
};