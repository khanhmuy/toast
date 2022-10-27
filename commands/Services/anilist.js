const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require('discord.js');
const Anilist = require('anilist-node');
const anilist = new Anilist();
module.exports = {
    guildOnly: true,
    data: new SlashCommandBuilder()
        .setName('anilist')
        .setDescription('Search for an anime or manga on AniList.')
        .addSubcommand(command => command.setName('anime')
            .setDescription('Search for an anime on AniList.')
            .addStringOption(option => option.setName('name')
                .setDescription('The anime to search for.')
                .setRequired(true)))
        .addSubcommand(command => command.setName('manga')
            .setDescription('Search for a manga on AniList.')
            .addStringOption(option => option.setName('name')
                .setDescription('The manga to search for.')
                .setRequired(true))),
    async execute(interaction) {
        interaction.deferReply();
        try {
            if (interaction.options.getSubcommand() === ('anime')) {
                const name = interaction.options.getString('name');
                var res = await anilist.search("anime", name, 1, 3);
                if (!res || !res.media || res.media.length === 0) {return interaction.editReply('No results found.');};
                res = await anilist.media.anime(res.media[0].id);
    
                let title = res.title.romaji;
                if (res.title.english) {title = `${title} | ${res.title.english}`};
    
                let format = res.format;
                if (format === 'TV_SHORT') {format = 'TV Short'};
                if (format === 'TV') {format = 'TV Series'}
                if (format === 'SPECIAL') {format = 'Special'};
                if (format === 'MOVIE') {format = 'Movie'};
    
                String.prototype.toTitleCase = function () {
                    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                };
    
                if (res.episodes === null) {res.episodes = 'No episode count found.'};
                let time = `${res.season.toTitleCase()} ${res.startDate.year}` || 'To be announced.';
    
                let duration = `${res.duration} minutes`;
                if (res.format === 'MOVIE') {duration = `${duration}`}
                else {duration = `${duration} per episode`};
    
                let description = '';
                try {
                    description = `[Anilist](${res.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${res.idMal})\n\n${res.description.replace(/<br>/g, "").replace(/<(i|\/i)>/g, "")}`;
                } catch (error) {
                    description = 'No description available.';
                }
    
                const embed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setURL(res.siteUrl)
                    .setColor(res.coverImage.color)
                    .setImage(res.bannerImage)
                    .setThumbnail(res.coverImage.medium)
                    .addFields([
                        {name: 'Format', value: `${format}`, inline: true},
                        {name: 'Season', value: `${time}`, inline: true},
                        {name: 'Episodes', value: `${res.episodes} (${duration})`, inline: true},
                    ])
                    .setTimestamp()
                    .setFooter(
                        {text: 'Last Updated', iconURL: 'https://www.gitbook.com/cdn-cgi/image/width=50,height=50,fit=contain,dpr=1,format=auto/https%3A%2F%2F553834213-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LHizcWWtVphqU90YAXO%252Favatar.png%3Fgeneration%3D1531944291782256%26alt%3Dmedia'}
                    )
                
                if (res.status === 'NOT_YET_RELEASED') {
                    embed.addFields([
                        {name: 'Status', value: 'Not yet released', inline: true},
                    ])
                } else {
                    embed.addFields([
                        {name: 'Status', value: `${res.status.toTitleCase()}`, inline: true},
                        {name: 'Average Score', value: `${res.meanScore} out of 100`, inline: true}
                    ])
                }
                await interaction.editReply({embeds: [embed]});
            }
            if (interaction.options.getSubcommand() === ('manga')) {
                const name = interaction.options.getString('name');
                var res = await anilist.search("manga", name, 1, 3);
    
                if (!res || !res.media || res.media.length === 0) {return interaction.editReply('No results found.');};
                res = await anilist.media.manga(res.media[0].id);
    
                let title = res.title.romaji;
                if (res.title.english) {title = `${title} | ${res.title.english}`};
    
                let format = res.format;
                if (format === 'MANGA') {format = 'Manga'}
                if (format === 'NOVEL') {format = 'Novel'}
                if (format === 'ONE_SHOT') {format = 'One Shot'}
    
                String.prototype.toTitleCase = function () {
                    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                };
    
                if (res.chapters === null) {res.chapters = 'No chapter count found.'};
                if (res.volumes === null) {res.volumes = 'No volume count found.'}
    
                let description = '';
                try {
                    description = `[Anilist](${res.siteUrl}) | [MyAnimeList](https://myanimelist.net/anime/${res.idMal})\n\n${res.description.replace(/<br>/g, "").replace(/<(i|\/i)>/g, "")}`;
                } catch (error) {
                    description = 'No description available.';
                }
                
                let embed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setURL(res.siteUrl)
                    .setColor(res.coverImage.color)
                    .setImage(res.bannerImage)
                    .setThumbnail(res.coverImage.medium)
                    .addFields([
                        {name: 'Format', value: `${format}`, inline: true},
                        {name: 'Chapters', value: `${res.chapters}`, inline: true},
                        {name: 'Volumes', value: `${res.volumes}`, inline: true},
                    ])
                    .setTimestamp()
                    .setFooter(
                        {text: 'Last Updated', iconURL: 'https://www.gitbook.com/cdn-cgi/image/width=50,height=50,fit=contain,dpr=1,format=auto/https%3A%2F%2F553834213-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LHizcWWtVphqU90YAXO%252Favatar.png%3Fgeneration%3D1531944291782256%26alt%3Dmedia'}
                    )
                if (res.status === 'NOT_YET_RELEASED') {
                    embed.addFields([
                        {name: 'Status', value: 'Not yet released', inline: true},
                    ])
                } else {
                    embed.addFields([
                        {name: 'Status', value: `${res.status.toTitleCase()}`, inline: true},
                        {name: 'Average Score', value: `${res.meanScore} out of 100`, inline: true}
                    ])
                }
                await interaction.editReply({embeds: [embed]});
            }
        } catch (error) {
            await interaction.editReply('There was an error while executing this command!');
            console.log(error);
        }
    }
}