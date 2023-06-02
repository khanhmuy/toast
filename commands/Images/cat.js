const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const Vibrant = require('node-vibrant');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Sends an adorable cat image 🐱!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://api.thecatapi.com/v1/images/search')
            let color = null
            color = await Vibrant.from(res.data[0].url).getPalette()
            color = color.Vibrant.hex
            const embed = new EmbedBuilder()
                    .setTitle('Random Cat!')
                    .setColor(color)
                    .setTimestamp()
                    .setImage(res.data[0].url)
                    .setURL(res.data[0].url)
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setStyle('Link')
                            .setURL(res.data[0].url)
                            .setLabel('View Orginal Image')
                    )
            await interaction.editReply({embeds: [embed], components: [row]})
        } catch (error) {
            console.log(error);
            await interaction.editReply('Something went wrong, try again later.');
        }
    }
};