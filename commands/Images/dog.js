const {SlashCommandBuilder} = require('@discordjs/builders');
const axios = require('axios');
const Vibrant = require('node-vibrant');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Sends an adorable dog image 🐶!'),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const res = await axios.get('https://dog.ceo/api/breeds/image/random')
            let color = null
            color = await Vibrant.from(res.data.message).getPalette()
            color = color.Vibrant.hex
            const embed = new MessageEmbed()
                .setTitle('Random Dog!')
                .setColor(color)
                .setTimestamp()
                .setImage(res.data.message)
                .setURL(res.data.message)
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(res.data.message)
                        .setLabel('View Orginal Image')
                )
            await interaction.editReply({embeds: [embed], componments: [row]})
        } catch (error) {
            console.log(error);
            await interaction.editReply('Something went wrong, try again later.');
        }
    }
};