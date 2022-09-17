const { EmbedBuilder } = require('discord.js');
ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const { SlashCommandBuilder } = require('discord.js');
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
        await interaction.deferReply();
        try {
            const query = interaction.options.getString('query'); 
            const link = `https://www.youtube.com/results?search_query=${query.replace(/\u0020/g, '%20')}`;
            const result = await ytsr(query, { limit: [8] });
            const embed = new EmbedBuilder()
                .setTitle('Results for ' + query)
                .setDescription(`[Total results](${link}): ${result.results}`)
                .setURL(link)
                .setColor('#FF0000')
                .setTimestamp()
            result.items.forEach(result => {
                if (result.type !== 'video') return;
                embed.addFields([
                    {name: result.title, value: `Channel: [${result.author.name}](${result.author.url})\n 👀: ${result.views} \nDuration: ${result.duration}\nUploaded ${result.uploadedAt}\n\n[View in YouTube](${result.url})`}
                ])
            })
            await interaction.editReply({embeds: [embed]});
        } catch (error) {
            console.log(error);
            interaction.editReply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};