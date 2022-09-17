const Vibrant = require('node-vibrant');
const { EmbedBuilder } = require('discord.js');
const tldr = require('wikipedia-tldr');
const { SlashCommandBuilder } = require('discord.js');
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
            const res = await tldr(query);
            if (res === null) {
                interaction.editReply({content: 'No results found.'});
                return;
            }
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
            const embed = new EmbedBuilder()
                .setTitle(res.title)
                .setThumbnail(thumbnail)
                .setDescription(res.description)
                .addFields([
                    {name: '\u200b', value: extract}
                ])
                .setColor(color)
                .setTimestamp()
            interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.log(error);
            interaction.editReply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};