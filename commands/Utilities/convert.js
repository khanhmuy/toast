const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('convert')
            .setDescription('Convert some value to another (eg Celsius to Fahrenheit)')
            .addSubcommand(command => command.setName('c2f')
                .setDescription('Celsius to Fahrenheit')
                .addNumberOption(option => option.setName('value')
                    .setDescription('The value to convert to Fahrenheit')
                    .setRequired(true)))
            .addSubcommand(command => command.setName('f2c')
                .setDescription('Fahrenheit to Celsius')
                .addNumberOption(option => option.setName('value')
                    .setDescription('The value to convert to Celsius')
                    .setRequired(true)))
            .addSubcommand(command => command.setName('rgb2hex')
                .setDescription('RGB to Hex')
                    .addNumberOption(option => option.setName('r')
                        .setDescription('The red value')
                        .setRequired(true))
                    .addNumberOption(option => option.setName('g')
                        .setDescription('The green value')
                        .setRequired(true))
                    .addNumberOption(option => option.setName('b')
                        .setDescription('The blue value')
                        .setRequired(true)))
            .addSubcommand(command => command.setName('hex2rgb')
                .setDescription('Hex to RGB')
                    .addStringOption(option => option.setName('hex')
                        .setDescription('The hex to convert')
                        .setRequired(true))),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'c2f') {
            await interaction.reply(`That's ${(interaction.options.getNumber('value') * 9 / 5) + 32} degrees Fahrenheit.`);
        }
        else if (interaction.options.getSubcommand() === 'f2c') {
            await interaction.reply(`That's ${(interaction.options.getNumber('value') - 32) * 5 / 9} degrees Celsius.`);
        }
        else if (interaction.options.getSubcommand() === 'rgb2hex') {
            function decToHex(value) {
                if (value > 255) {
                    return 'FF';
                }
                else if (value < 0) {
                    return '00';
                }
                else {
                    return value.toString(16).padStart(2, '0').toUpperCase();
                }
            }
            const hex = `#${decToHex(interaction.options.getNumber('r'))}${decToHex(interaction.options.getNumber('g'))}${decToHex(interaction.options.getNumber('b'))}`
            const canvas = Canvas.createCanvas(128, 128);
            const context = canvas.getContext('2d');
            context.fillStyle = hex;
            context.fillRect(0, 0, 128, 128);
            const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), {name: 'color.png'});
            await interaction.reply({ content: `It's \`${hex.toUpperCase()}\``, files: [attachment] });
        }
        else if (interaction.options.getSubcommand() === 'hex2rgb') {
            if (!/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(interaction.options.getString('hex')))
                return await interaction.reply({content: 'Thats not a hex code!', ephemeral: true});
            const out = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(interaction.options.getString('hex'));
            const result = {
                r: parseInt(out[1], 16),
                g: parseInt(out[2], 16),
                b: parseInt(out[3], 16)
            };
            const canvas = Canvas.createCanvas(128, 128);
            const context = canvas.getContext('2d');
            context.fillStyle = `#${interaction.options.getString('hex')}`;
            context.fillRect(0, 0, 128, 128);
            const buffer = canvas.toBuffer('image/png');
            const attachment = new AttachmentBuilder(buffer, {name: 'color.png'});
            await interaction.reply({ content: `It's \`${result.r}, ${result.g}, ${result.b}\``, files: [attachment] });
        }
    }
};