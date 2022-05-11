const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
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
                        color = 'GREEN'
                        status = 'Online'
                        break
                    case('idle'):
                        color = 'YELLOW'
                        status = 'Idle'
                        break
                    case('dnd'):
                        color = 'RED'
                        status = 'Do Not Disturb'
                        break
                    case('null'):
                        color = 'BLACK'
                        status = 'Offline / Invisible'
                  }
            } catch {
                color = 'BLACK';
                status = 'Offline / Invisible';
            }
        const roles = member.roles.cache.filter(r => r.name !== "@everyone").map(r => r).join(" | ") || 'No Roles';
        const embed = new MessageEmbed()
            .setTitle('User information of ' + user.tag)
            .setColor(color || 'BLACK')
            .setURL('https://discord.com/users/' + user.id)
            .setThumbnail(user.displayAvatarURL({ dynamic:true })+'?size=1024')
            .setDescription('[Avatar](' + user.displayAvatarURL({ dynamic:true })+'?size=1024' + ')')
            .addFields(
                { name: 'Account Registered Date', value: `${moment(user.createdAt).format('LLLL')} (${moment().diff(user.createdAt, 'years')} years ago)`, inline: true },
                { name: 'Joined Server Join Date', value: `${moment(member.createdAt).format('LLLL')} (${moment().diff(member.createdAt, 'years')} years ago)`, inline: true },
                { name: 'Online presence', value: '' + status || 'Offline / Invisible', inline: true },
                { name: 'Roles', value: '' + roles, inline: true },
                { name: 'Account identification', value: 'Tag: ' + user.tag + '\nID: ' + user.id, inline: true },
            )
            .setTimestamp()
        interaction.reply({embeds: [embed]});
    }
};