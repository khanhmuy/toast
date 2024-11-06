const Vibrant = require('node-vibrant');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wiki = require('wikipedia');
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
        await interaction.deferReply();
        try {
            const query = interaction.options.getString('query');
            try {
                const res = await wiki.page(query);
            } catch (error) {
                interaction.editReply({content: 'No results found!', ephemeral: true});
                return;
            }
            const summary = await res.summary();
            let color = null;
            let thumbnail = '';
            try {
                thumbnail = summary.thumbnail.source;
                color = await Vibrant.from(summary.thumbnail.source).getPalette();
                color = color.Vibrant.hex;
            } catch {
                thumbnail = 'https://en.wikipedia.org/static/images/project-logos/enwiki.png';
                color = '#89b4fa';
            }
            let extract = '';
            if (summary.extract.length > 1024) {
                extract = summary.extract.substring(0, 1018) + '(...)';
            } else {
                extract = summary.extract;
            }
            const embed = new EmbedBuilder()
                .setTitle(summary.title)
                .setURL(summary.content_urls.desktop.page)
                .setThumbnail(thumbnail)
                .setDescription(summary.description)
                .addFields([
                    {name: '\u200b', value: extract}
                ])
                .setColor(color)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            interaction.editReply({content: 'There was an error while executing this command!', ephemeral: true});
            console.log(error);
        }
    },
};