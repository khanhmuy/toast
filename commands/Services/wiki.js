const Vibrant = require('node-vibrant');
const { MessageEmbed } = require('discord.js');
const tldr = require('wikipedia-tldr');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('wikipedia')
        .setDescription('Search for things on Wikipedia!')
        .addStringOption(option => {
            return option
                .setName('query')
                .setRequired(true)
                .setDescription('The search term.');
        }),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        const res = await tldr(query);
        let color = null;
        let thumbnail = '';
        try {
            thumbnail = res.thumbnail.source;
            color = await Vibrant.from(res.thumbnail.source).getPalette();
            color = color.Vibrant.hex;
        } catch {
            thumbnail = 'https://en.wikipedia.org/static/images/project-logos/enwiki.png';
            color = 'BLUE';
        }
        let extract = '';
        if (res.extract.length > 1024) {
            extract = res.extract.substring(0, 1018) + '(...)';
        } else {
            extract = res.extract;
        }
        const embed = new MessageEmbed()
            .setTitle(res.title)
            .setThumbnail(thumbnail)
            .setDescription(res.description)
            .addField('\u200b', extract)
            .setColor(color)
            .setTimestamp()
        interaction.reply({ embeds: [embed] });
    },
};