const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Suggest something!')
        .addStringOption(option => {
            return option
                .setName('suggestion')
                .setRequired(true)
                .setDescription('Your suggestion.');
        }),
    async execute(interaction) {
        interaction.client.data.ensure(`guild.${interaction.guild.id}.suggestTotal`, 0);
		interaction.client.data.set(`guild.${interaction.guild.id}.suggestTotal`, interaction.client.data.get(`guild.${interaction.guild.id}.suggestTotal`) + 1);
		const suggestionnum = interaction.client.data.get(`guild.${interaction.guild.id}.suggestTotal`);

		console.log(interaction.client.data.get(`guild.${interaction.guild.id}.suggestionChannel`));
		if (!interaction.client.data.get(`guild.${interaction.guild.id}.suggestionChannel`)) {
			interaction.reply({content: 'Suggestions are disabled in this guild!', ephemeral: true});
		} else {
			const embed = new EmbedBuilder()
				.setTitle(`Suggestion #${suggestionnum}`)
				.setDescription(interaction.options.getString('suggestion'))
				.setColor('#94e2d5')
				.setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })});
			const channel = interaction.client.channels.cache.get(interaction.client.data.get(`guild.${interaction.guild.id}.suggestionChannel`));
			channel.send({ embeds: [embed] }).then(embedMessage => {
				embedMessage.react('<:upvote:975193113989636167>');
				embedMessage.react('<:downvote:975193166510698546>');
			});
			interaction.reply({content: `Suggestion #${suggestionnum} submitted! Check it out in ${channel}`, ephemeral: true});
		}
    }
};