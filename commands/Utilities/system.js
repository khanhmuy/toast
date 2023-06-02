const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const si = require('systeminformation');
const nodeOS = require('os');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('system')
        .setDescription('Get information of the bot process and server hardware'),
    async execute(interaction) {
        await interaction.deferReply();
        function convToDays(totalSeconds) {
			const days = Math.floor(totalSeconds / 86400);
			totalSeconds %= 86400;
			const hours = Math.floor(totalSeconds / 3600);
			totalSeconds %= 3600;
			const minutes = Math.floor(totalSeconds / 60);
			const seconds = Math.floor(totalSeconds % 60);
			const daysText = (days == 1 ? 'day' : 'days');
			const hoursText = (hours == 1 ? 'hour' : 'hours');
			const minutesText = (minutes == 1 ? 'minute' : 'minutes');
			const daysFinal = (days >= 1 ? days + ' ' + daysText + ', ' : '');
			const hoursFinal = (hours >= 1 ? hours + ' ' + hoursText + ', ' : '');
			const minutesFinal = (minutes >= 1 ? minutes + ' ' + minutesText + ' and ' : '');
			return `${daysFinal}${hoursFinal}${minutesFinal}${seconds} seconds`;
		}
        let [ cpu, mem, os, temp, load ] = await Promise.all([ si.cpu(), si.mem(), si.osInfo(), si.cpuTemperature(), si.currentLoad() ]);
        const totalSeconds = (interaction.client.uptime / 1000);
        const uptime = convToDays(totalSeconds);
        const embed = new EmbedBuilder()
			.setColor('#a6e3a1')
			.setTitle(`System & Process Information for ${interaction.client.user.username}`)
			.setTimestamp()
			.setFooter(
				{text: `Last Updated`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`}
			)
			.addFields([
				{name: 'Process Information', value: `**Uptime** \n${uptime} \n👥 **Serving** \n${interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} members \n📗 **Running** \n${process.release.name} ${process.version}`},
				{name: `System Information`, value: `💻 **Device Hostname** \n${os.hostname} \n🤖 **CPU** \n${cpu.cores} Core ${cpu.manufacturer} ${cpu.brand}@${cpu.speed}GHz ${process.config.variables.host_arch} \n**General CPU Load** \n${load.avgLoad}% \nCurrently ${temp.main}°c \n⏱️ **Device Uptime** \n${convToDays(nodeOS.uptime())} \n🗄️ **Memory** \nTotal Memory: ${(mem.total / 1000000000).toFixed(2)}GB \nUsed Memory: ${(mem.used / 1000000000).toFixed(2)}GB \nFree Memory: ${(mem.free / 1000000000).toFixed(2)}GB \n**Operating System** \n${os.distro} ${os.release} ${os.arch}`}
			])
        await interaction.editReply({embeds: [embed]})
    }
};