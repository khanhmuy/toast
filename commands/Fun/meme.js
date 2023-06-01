const { SlashCommandBuilder } = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const axios = require('axios');
const Vibrant = require('node-vibrant');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Sends a random meme from various subreddits!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://meme-api.com/gimme');
            console.log(res);
            last = res.data.preview[res.data.preview.length - 1]
            let color = null;
            color = await Vibrant.from(last).getPalette();
            color = color.Vibrant.hex;
            const embed = new EmbedBuilder()
                .setColor(color)
                .setTitle(res.data.title)
                .setDescription(`r/${res.data.subreddit}`)
                .setImage(last)
                .setURL(res.data.postLink)
                .setFooter(
                    {text: `Author: ${res.data.author}`}
                )
            await interaction.editReply({ embeds: [embed]});
        } catch (error) {
            console.log(error);
            await interaction.editReply({ content: 'Something went wrong, try again later.' });
        }
    }
};