const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const Vibrant = require('node-vibrant');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('waifu')
        .setDescription('Sends a random (SFW) waifu image!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://api.waifu.pics/sfw/waifu')  
            let color = null
            color = await Vibrant.from(res.data.url).getPalette()
            color = color.Vibrant.hex
            const embed = new EmbedBuilder()
                .setTitle('Waifu image')
                .setColor(color)
                .setTimestamp()
                .setImage(res.data.url)
                .setURL(res.data.url)
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle('Link')
                        .setURL(res.data.url)
                        .setLabel('View Orginal Image')
                )
            interaction.editReply({embeds: [embed], components: [row]});
        } catch (error) {
            console.log(error);
            interaction.editReply('Something went wrong, try again later.')
        }
    }
};