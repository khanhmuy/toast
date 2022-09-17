const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');
const Vibrant = require('node-vibrant');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Sends an adorable dog image 🐶!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://dog.ceo/api/breeds/image/random')
            let color = null
            color = await Vibrant.from(res.data.message).getPalette()
            color = color.Vibrant.hex
            const embed = new EmbedBuilder()
                .setTitle('Random Dog!')
                .setColor(color)
                .setTimestamp()
                .setImage(res.data.message)
                .setURL(res.data.message)
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle('Link')
                        .setURL(res.data.message)
                        .setLabel('View Orginal Image')
                )
            await interaction.editReply({embeds: [embed], componments: [row]})
        } catch (error) {
            console.log(error);
            await interaction.editReply('Something went wrong, try again later.');
        }
    }
};