const { SlashCommandBuilder } = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8 ball a question!')
        .addStringOption(option => {
            return option
                .setName('question')
                .setRequired(true)
                .setDescription('The question you want to ask.');
        })
        .addBooleanOption(option => option.setName('private')
            .setDescription('Whether or not the answer should be private.')
            .setRequired(true)),
    async execute(interaction) {
        const answers = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ]
        const question = interaction.options.getString('question');
        const answer = (Math.floor(Math.random() * answers.length));
        const embed = new EmbedBuilder()
            .setColor('#FFC0CB')
            .setTitle('**Magic 8-Ball**')
            .setDescription(`**Your question**: ` + question + `\n**Our Magic 8-Ball Says**: ${answers[answer]}`)
        if (interaction.options.getBoolean('private') === true) {
            interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            interaction.reply({ embeds: [embed] });
        }
    }
}