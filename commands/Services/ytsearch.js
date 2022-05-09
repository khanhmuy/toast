const { MessageEmbed } = require('discord.js');
ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ytsearch')
        .setDescription('Search for videos on YouTube')
        .addStringOption(option => {
            return option
                .setName('query')
                .setRequired(true)
                .setDescription('The search term.');
        }),
    async execute(interaction) {
        const query = interaction.options.getString('query'); 
        const link = `https://www.youtube.com/results?search_query=${query.replace(' ', '%20')}`;
        console.log(link);
        const result = await ytsr(query, { limit: [8] });
        const embed = new MessageEmbed()
            .setTitle('Results for ' + query)
            .setDescription(`[Total results](${link}): ${result.results}`)
            .setURL(link)
            .setColor('#FF0000')
            .setTimestamp()
        result.items.forEach(result => {
            if (result.type !== 'video') return;
            embed.addField(result.title, `Channel: [${result.author.name}](${result.author.url})\n 👀: ${result.views} \nDuration: ${result.duration}\nUploaded ${result.uploadedAt}\n\n[View in YouTube](${result.url})`)
        })
        await interaction.reply({embeds: [embed]});
    },
};