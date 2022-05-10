const {MessageEmbed} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Vibrant = require('node-vibrant')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('jumbo')
        .setDescription('Enlarge an emoji!')
        .addStringOption(option => {
            return option
                .setName('emoji')
                .setDescription('The emoji to enlarge.')
                .setRequired(true);
        }),
    async execute(interaction) {
        console.log(interaction);  
        const input = interaction.options.getString('emoji');
        const msg = input.match(/<a?:.+:\d+>/gm);
        let url = '';
        if (emoji = /<:.+:(\d+)>/gm.exec(msg)) {
            url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1?size=1000";
        } else if (emoji = /<a:.+:(\d+)>/gm.exec(msg)) {
            url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1?size=1000";
        } 
        if (url) {
            const color = await Vibrant.from(url).getPalette();
            embed = new MessageEmbed()
                .setColor(color.Vibrant.hex)
                .setAuthor(interaction.user.username, `${interaction.user.displayAvatarURL({ dynamic: true })}?size=1024`)
                .setImage(url)
            interaction.reply({ embeds: [embed] });
        } if (!url) {
            interaction.reply('Invalid emoji!, might be a Unicode emoji or an external / animated emoji that you don\'t have access to. ~~(get nitro you cheap mf)~~');
        }
    },
};