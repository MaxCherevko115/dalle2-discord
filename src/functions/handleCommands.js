require('dotenv').config();

const { REST, Routes } = require('discord.js');

module.exports = (client) => {
    client.handleCommands = async (commandFiles, path) => {
        client.commandArray = [];
        
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);

            // Set a new item in the Collection with the key as the command name and the value as the exported module
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }


        // Construct and prepare an instance of the REST module
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        // and deploy your commands!
        (async () => {
            try {
                console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);

                // The put method is used to fully refresh all commands in the guild with the current set
                const data = await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                    { body: client.commandArray },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                // And of course, make sure you catch and log any errors!
                console.error(error);
            }
        })();
    }
};