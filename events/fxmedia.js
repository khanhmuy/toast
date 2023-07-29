module.exports = {
    name: 'messageCreate',
    async execute(interaction) {
        if (interaction.author.bot == true || interaction.content == undefined) return;
        const exec = interaction.client.data.get(`guild.${interaction.guildId}.fxmedia`);
        if (exec === undefined) return;

        const twitter = /^http(?:s)?:\/\/(.*)\btwitter\b\.com\//
        var twRegExp = new RegExp(twitter, 'g');
        if (twitter.test(interaction.content) == true) {
            interaction.suppressEmbeds(true);
            interaction.reply({content: interaction.content.replace(twRegExp, 'https://vxtwitter.com/'), allowedMentions: {repliedUser: false}})
        }

        const facebook = /^http(?:s)?:\/\/(.*)(www)?(.*)\bfacebook\b\.com\//
        var fbRegExp = new RegExp(facebook, 'g');
        if (facebook.test(interaction.content) == true) {
            interaction.suppressEmbeds(true);
            interaction.reply({content: interaction.content.replace(fbRegExp, 'https://fxfacebook.beerpsi.tech/'), allowedMentions: {repliedUser: false}})
        }

        const instagram = /^http(?:s)?:\/\/(.*)(www)?(.*)\binstagram\b\.com\//
        var igRegExp = new RegExp(instagram, 'g');
        if (instagram.test(interaction.content) == true) {
            interaction.suppressEmbeds(true);
            interaction.reply({content: interaction.content.replace(igRegExp, 'https://ddinstagram.com/'), allowedMentions: {repliedUser: false}})
        }
    },
}