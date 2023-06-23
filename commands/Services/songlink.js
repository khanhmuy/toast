const {SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');
const axios = require('axios');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('songlink')
        .setDescription('Get a link to a song on various services!')
        .addStringOption(option => option.setName('url')
            .setDescription('The URL of the song you want to get a link to.')
            .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const url = interaction.options.getString('url');
        const res = await axios.get(`https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(url)}`);
        const row1 = new ActionRowBuilder();
        const row2 = new ActionRowBuilder();
        Object.keys(res.data.linksByPlatform).forEach(platform => {
            supportedPlatforms1 = [
                'spotify',
                'appleMusic',
                'youtubeMusic',
                'tidal',
                'soundcloud'
            ]
            supportedPlatforms2 = [
                'youtube',
                'pandora',
                'deezer',
                'audiomack'
            ]
            const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
            if (supportedPlatforms1.includes(platform)) {
                button = new ButtonBuilder()
                    .setStyle('Link')
                    .setURL(res.data.linksByPlatform[platform].url)
                    .setLabel(platformName)
                row1.addComponents(button);
            } else if (supportedPlatforms2.includes(platform)) {
                button = new ButtonBuilder()
                    .setStyle('Link')
                    .setURL(res.data.linksByPlatform[platform].url)
                    .setLabel(platformName)
                row2.addComponents(button);
            }
        })
        const songlink = new ButtonBuilder()
            .setStyle('Link')
            .setURL(res.data.pageUrl)
            .setLabel('View on SongLink')
        row2.addComponents(songlink);
        interaction.editReply({components: [row1, row2]})
    }
};