const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Vibrant = require('node-vibrant');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('jbpackage')
        .setDescription('Get the info of a jailbreak package via Canister')
        .addStringOption(option => {
            return option
                .setName('query')
                .setRequired(true)
                .setDescription('The search term.');
        }),
    async execute(interaction) {
        const input = interaction.options.getString('query');
        const query = input.replace(' ', '%20');
        const info = await axios.get('https://api.canister.me/v1/community/packages/search?query=' + query + '&searchFields=identifier,name,author,maintainer&responseFields=identifier,name,description,packageIcon,repository.uri,repository.name,author,latestVersion,depiction,section,price,maintainer');
        if (!info.data.data[0]) return interaction.reply({content: 'No results found!', ephemeral: true});
        const embed = new MessageEmbed()
        try {
            let color = null
            try {
                const icon = info.data.data[0].packageIcon;
                if (info.data.data[0].packageIcon.startsWith('http:') || info.data.data[0].packageIcon.startsWith('https:')) {
                    color = await Vibrant.from(info.data.data[0].packageIcon || 'https://repo.packix.com/api/Packages/60bfb71987ca62001c6585e6/icon/download?size=medium&hash=2').getPalette()
                    color = color.Vibrant.hex
                } else {
                    color = '#fccc04'
                    info.data.data[0].packageIcon = undefined
                }
            } catch {
                color = '#fccc04'
                info.data.data[0].packageIcon = undefined
            }
            const embed = new MessageEmbed()
                .setTitle(info.data.data[0].name || 'what')
                .setDescription(info.data.data[0].description || 'No description provided.')
                .setThumbnail(info.data.data[0].packageIcon || 'https://repo.packix.com/api/Packages/60bfb71987ca62001c6585e6/icon/download?size=medium&hash=2')
                .setColor(color || '#fccc04')
                .addFields(
                    { name: 'Author', value: info.data.data[0].author.toString() || 'Unknown', inline: true },
                    { name: 'Version', value: info.data.data[0].latestVersion.toString() || 'Unknown', inline: true },
                    { name: 'Price', value: info.data.data[0].price.toString() || 'Unknown', inline: true },
                    { name: 'Bundle ID', value: info.data.data[0].identifier.toString(), inline: true },
                    { name: 'Repository', value: `[${info.data.data[0].repository.name}](${info.data.data[0].repository.uri})\n${info.data.data[0].repository.uri}`, inline: true },
                )
                .setFooter('Powered by Canister')
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(info.data.data[0].depiction || 'https://404.github.io/')
                        .setEmoji('🔍')
                        .setLabel('View Depiction'),
                    new MessageButton()
                        .setStyle('LINK')
                        .setURL(`https://repos.slim.rocks/repo/?repoUrl=${info.data.data[0].repository.uri}`)
                        .setEmoji('📦')
                        .setLabel('Add Repository'),
                );
            interaction.reply({ embeds: [embed], components:[row]});
        } catch (err) {
            console.log(err);
            interaction.reply({content: 'An unknown error occurred!', ephemeral: true});
        }
    }
};