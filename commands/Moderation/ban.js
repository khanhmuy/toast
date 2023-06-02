const {EmbedBuilder, SlashCommandBuilder, PermissionsBitField} = require('discord.js');
module.exports = {
    permissions: [PermissionsBitField.Flags.BanMembers],
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server.')
        .addUserOption(option => option.setName('user')
            .setDescription('The user to ban.')
            .setRequired(true))
        .addStringOption(option => option.setName('reason')
            .setDescription('The reason for banning the user.')
            .setRequired(false)),
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral: true});
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason') || 'No reason provided.';
            
            if (reason) {
                await interaction.guild.members.ban(user, {reason: reason});
            } else {
                await interaction.guild.members.ban(user);
            }

            const replyEmbed = new EmbedBuilder()
            .setTitle('Success!')
            .setDescription(`Banned ${user.tag}`)
            .setColor('#a6e3a1')
            .setTimestamp()
            .addFields(
                {name: 'Reason', value: reason},
            )    

            const server = await interaction.guild.fetch();
            const userEmbed = new EmbedBuilder()
                .setAuthor({name: `${interaction.guild.name}`, iconURL: `${server.iconURL()}`})
                .setTitle(`You have been banned from ${interaction.guild.name}.`)
                .addFields([
                    {name: 'Moderator', value: `<@!${interaction.user.id}>`, inline: true},
                    {name: 'Reason', value: `${reason}`, inline: true}
                ])
                .setColor('#f38ba8')
                .setTimestamp()
            
            try {
                await client.users.send(`${user.id}`, {embeds: [userEmbed]});
            } catch (err) {
                replyEmbed.setFooter({text: 'Could not send DM to user.'})
            };

            await interaction.editReply({embeds: [replyEmbed], ephemeral: true});
        } catch(err) {
            console.log(err);
            if (err.toString().startsWith('DiscordAPIError[50013]: Missing Permissions') === true) {
                await interaction.editReply({content: 'I do not have the permissions to kick this user.', ephemeral: true});
            }
        }
    }
}