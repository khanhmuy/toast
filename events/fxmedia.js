module.exports = {
    name: 'messageCreate',
    async execute(interaction) {
        if (interaction.author.bot == true || interaction.content == undefined) return;
        const exec = interaction.client.data.get(`guild.${interaction.guildId}.fxmedia`);
        if (exec === undefined) return;
        const twitter = /^http(?:s)?:\/\/(.*)twitter\.com\//
        const facebook = /^http(?:s)?:\/\/(.*)(www)?(.*)facebook\.com\//
        if (twitter.test(interaction.content) == true) {
            interaction.suppressEmbeds(true);
            interaction.reply({content: interaction.content.replace(/twitter.com/g, 'vxtwitter.com'), allowedMentions: {repliedUser: false}})
        }
        if (facebook.test(interaction.content) == true) {
            interaction.suppressEmbeds(true);
            interaction.reply({content: interaction.content.replace(/^http(?:s)?:\/\/(.*)(www)?(.*)facebook\.com\//g, 'https://fxfacebook.beerpsi.tech/'), allowedMentions: {repliedUser: false}})
        }
    },
}