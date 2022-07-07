const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('urban')
        .setDescription('Search the Urban Dictionary.')
        .addStringOption(option => {
            return option
                .setName('searchterm')
                .setRequired(true)
                .setDescription('The search term.');
        }),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const input = interaction.options.getString('searchterm');
            const query = input.replace(' ', '%20');
            const url = `http://api.urbandictionary.com/v0/define?term=${query}`;
            const { data } = await axios.get(url);
            if (!data.list[0]) return interaction.editReply({content: 'No results found!', ephemeral: true});
            const embed = new MessageEmbed()
                .setTitle(`Definition of: ${data.list[0].word}`)
                .setDescription(`${data.list[0].definition}`)
                .setURL(data.list[0].permalink)
                .addFields(
                    { name: 'Example', value: data.list[0].example.toString() },
                    { name: '👍', value: data.list[0].thumbs_up.toString(), inline: true },
                    { name: '👎', value: data.list[0].thumbs_down.toString(), inline: true },
                    { name: 'Author', value: data.list[0].author.toString(), inline: true },
                )
                .setColor('#EFFF00')
                .setThumbnail('https://i.imgur.com/VFXr0ID.jpg')
                .setTimestamp();
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(data.list[0].permalink)
                        .setLabel('View Definition on Urban Dictionary')
                )
            interaction.editReply({embeds: [embed], components: [row]});
        } catch (error) {
            console.log(error);
            interaction.editReply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    },
};