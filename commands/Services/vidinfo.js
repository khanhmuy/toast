// this is a fucking bodge but ok
const ytdl = require('ytdl-core');
const axios = require('axios');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('videoinfo')
        .setDescription('Get the information of a YouTube video')
        .addStringOption(option => {
            return option
                .setName('id')
                .setRequired(true)
                .setDescription('The video ID or link.');
        }),
    async execute(interaction) {
        await interaction.deferReply();
        const input = interaction.options.getString('id');
        let id = '';
        if (input.match(/https:\/\/www.youtube.com\/watch\?v=./)) {
            id = input.slice(32,43);
        }; if (input.match(/https:\/\/youtu.be\/./)) {
            id = input.slice('https://youtu.be/'.length);
        }; if (!input.match(/https:\/\/www.youtube.com\/watch\?v=./) && !input.match(/https:\/\/youtu.be\/./)) {
            id = input;
        };
        try {
            const info = await ytdl.getInfo(id);
            const minutes = Math.floor(info.videoDetails.lengthSeconds / 60);
            let seconds = '';
            let rawSeconds = info.videoDetails.lengthSeconds - minutes * 60;
            if (rawSeconds < 10) {
                seconds = '0' + rawSeconds;
            } else {seconds = rawSeconds};
            const duration = `${minutes}:${seconds}`;
            let dislikeCount = '';
            try {
                const dislike = await axios.get('https://returnyoutubedislikeapi.com/votes?videoId=' + id);
                dislikeCount = dislike.data.dislikes
            } catch {
                dislikeCount = 'Not available.';
            }
            const link = 'https://www.youtube.com/watch?v=' + id;
            let description = '';
            try {
                description = info.videoDetails.description;
                if (description.length > 3995) {
                    description = description.slice(0, 3995) + ' (...)';
                } else {
                    description = description;
                }
            } catch {
                description = 'Not available.';
            }
            const embed = new EmbedBuilder()
                .setTitle(info.videoDetails.title)
                .setColor('#ff0000')
                .setURL(link)
                .setThumbnail(info.videoDetails.thumbnails[3].url)
                .setDescription(description)
                .addFields([
                    { name: 'Date created', value: `${info.videoDetails.uploadDate}`, inline: true },
                    { name: 'Duration', value: `${duration}`, inline: true },
                    { name: 'Category:', value: `${info.videoDetails.category}`, inline: true },
                    { name: 'Views', value: `${info.videoDetails.viewCount}`, inline: true },
                    { name: 'Likes', value: `${info.videoDetails.likes}`, inline: true },
                    { name: 'Dislikes', value: `${dislikeCount}`, inline: true },
                    { name: 'Channel', value: `[${info.videoDetails.ownerChannelName}](${info.videoDetails.author.channel_url})`, inline: true },
                    { name: 'Subscribers', value: `${info.videoDetails.author.subscriber_count}`, inline: true }
                ])
                .setTimestamp()
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle('Link')
                        .setLabel('View Video on YouTube')
                        .setURL(link)
                )
            await interaction.editReply({ embeds: [embed], components: [row]});
        } catch (err) {
            console.log(err);
            return interaction.editReply({content: 'No results found!', ephemeral: true});
        }
    },
};