const { SlashCommandBuilder } = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const axios = require('axios');
const Vibrant = require('node-vibrant');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Sends a random meme!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://meme-api.herokuapp.com/gimme/1');
            let color = null;
            color = await Vibrant.from(res.data.memes[0].url).getPalette();
            color = color.Vibrant.hex;
            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(res.data.memes[0].title)
                .setImage(res.data.memes[0].url)
                .setURL(res.data.memes[0].postLink)
                .setFooter(
                    {text: `Author: ${res.data.memes[0].author}`}
                )
            await interaction.editReply({ embeds: [embed]});
        } catch (error) {
            console.log(error);
            await interaction.editReply({ content: 'Something went wrong, try again later.' });
        }
    }
};