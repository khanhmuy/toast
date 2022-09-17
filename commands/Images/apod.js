const axios = require('axios');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('apod')
        .setDescription('Get the NASA Astronomy Picture of the Day'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            let apiKey = process.env.NASA_API_KEY;
            if (apiKey == null) {apiKey = 'DEMO_KEY';}
            else {apiKey = apiKey};
            const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
            let hdurl = res.data.hdurl;
            if (hdurl == undefined) {hdurl = 'https://hmuy.ml/404'};
            const embed = new EmbedBuilder()
                .setTitle(res.data.title)
                .setURL(res.data.url)
                .setDescription(res.data.explanation)
                .setColor('#105BD8')
                .setImage(res.data.url)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle('Link')
                        .setURL(hdurl)
                        .setLabel('View Full Image')
                )
            await interaction.editReply({embeds: [embed], components: [row]});
        } catch (error) {
            console.log(error);
            await interaction.editReply('There was an error loading the image. Please try again later.');
        }
    },
};