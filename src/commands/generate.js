const { SlashCommandBuilder } = require('@discordjs/builders');
const createPicture = require('../dalle/generateFunc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('generate')
        .setDescription('Create a new picture')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('Prompt for the bot')
                .setMinLength(3)
                .setMaxLength(1000)
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('quantity')
                .setDescription('Number from 1 to 10')
                .setMinValue(1)
                .setMaxValue(10)),
    async execute (interaction) {

        await interaction.deferReply({ephemeral: true});

        const answer = await createPicture(interaction.options.getString('prompt'), interaction.options.getInteger('quantity'));

        if(answer.hasOwnProperty('error')){
            await interaction.editReply(`**${answer.error}**`);
            return;
        }

        if(answer.pictures.length !== 0){
            await interaction.channel.send({content:`**${interaction.options.getString('prompt')}** - <@${interaction.user.id}>`, files: [...answer.pictures]});
        }
        await interaction.editReply('**Created!**');

    }
}
