const {EmbedBuilder, SlashCommandBuilder, PermissionsBitField} = require('discord.js');
module.exports = {
    permissions: [PermissionsBitField.Flags.BanMembers],
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a user from the guild.')
        .addUserOption(option => option.setName('user')
            .setDescription('The user to unban.')
            .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});
        try {
            const user = interaction.options.getUser('user');
            interaction.guild.members.unban(user);

            const replyEmbed = new EmbedBuilder()
                .setTitle('Success!')
                .setDescription(`Unbanned ${user.tag}`)
                .setColor('#a6e3a1')
                .setTimestamp()
            await interaction.editReply({embeds: [replyEmbed], ephemeral: true});
        } catch(err) {
            console.log(err);
        }
    }
}