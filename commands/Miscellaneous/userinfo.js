const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const moment = require('moment');
module.exports= {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Get information about a user')
        .addUserOption(option => {
            return option
                .setName('user')
                .setDescription('The user to get information about.')
                .setRequired(false);
        }),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            let color = 'BLACK';
            let status = 'Offline / Invisible';
            let member = null
            if (!interaction.options.getUser('user')) {
                member = interaction.member;
            } else {
                member = interaction.guild.members.cache.get(interaction.options.getUser('user').id);
            }
            const user = member.user;
            try {
                switch(member.presence.status){
                    case('online'):
                        color = '#18DB4C'
                        status = 'Online'
                        break
                    case('idle'):
                        color = '#F3FF52'
                        status = 'Idle'
                        break
                    case('dnd'):
                        color = '#FF4046'
                        status = 'Do Not Disturb'
                        break
                    case('null'):
                        color = '#000000'
                        status = 'Offline / Invisible'
                  }
            } catch {
                color = 'BLACK';
                status = 'Offline / Invisible';
            }
            const roles = member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(" | ") || 'No Roles';
            const embed = new EmbedBuilder()
                .setTitle('User information of ' + user.tag)
                .setColor(color || '#000000')
                .setURL('https://discord.com/users/' + user.id)
                .setThumbnail(user.displayAvatarURL({ dynamic:true })+'?size=1024')
                .setDescription('[Avatar](' + user.displayAvatarURL({ dynamic:true })+'?size=1024' + ')')
                .addFields([
                    { name: 'Account Registered Date', value: `${moment(user.createdAt).format('LLLL')} (${moment().diff(user.createdAt, 'years')} years ago)`, inline: true },
                    { name: 'Server Join Date', value: `${moment(member.joinedTimestamp).format('LLLL')} (${moment().diff(member.createdAt, 'years')} years ago)`, inline: true },
                    { name: 'Online presence', value: '' + status || 'Offline / Invisible', inline: true },
                    { name: 'Roles', value: '' + roles, inline: true },
                    { name: 'Account identification', value: 'Tag: ' + user.tag + '\nID: ' + user.id, inline: true },
                ])
                .setTimestamp()
            interaction.editReply({embeds: [embed]});
        } catch (error) {
            await interaction.editReply({content: 'Something went wrong, please try again later'});
            console.log(error);
        }
    }
};