const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const axios = require('axios');
const Vibrant = require('node-vibrant');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('fox')
        .setDescription('Sends an adorable fox image🦊!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://randomfox.ca/floof/')
            let color = null
            color = await Vibrant.from(res.data.image).getPalette()
            color = color.Vibrant.hex
            const embed = new MessageEmbed()
                .setTitle('Random Fox!')
                .setImage(res.data.image)
                .setColor(color)
                .setTimestamp()
                .setURL(res.data.link)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(res.data.link)
                        .setLabel('View Orginal Image')
                )
            interaction.editReply({ embeds: [embed], components: [row]});
        } catch (error) {
            console.log(error);
            await interaction.editReply('Something went wrong, try again later.');
        }
    }
};