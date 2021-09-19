import Discord, { WebhookClient, MessageEmbed } from 'discord.js'
import Dotenv from 'dotenv'
import { join } from 'path'
import { Erin } from '.'
import log from './logger'
import cmdHandler from './Handler'

// Initializing .env file
Dotenv.config({ path: join(__dirname, "../.env") });

// Initializing the client object 
// @ts-ignore ts-crying
const client: Erin.ExtendedClient = new Discord.Client({
    intents: new Discord.Intents([Discord.Intents.FLAGS.GUILD_VOICE_STATES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]).remove([Discord.Intents.FLAGS.DIRECT_MESSAGES])
});

// Client configs
client.emoji = { "bd": "<:bd:886912421229379594>" }
client.events = new Discord.Collection()
client.slashCommands = new Discord.Collection();
cmdHandler(client)

process.on('unhandledRejection', async (err: Error) => {
    const webhookClient = new WebhookClient({ url: process.env.ERROR_LOG });

    const errEmbed = new MessageEmbed()
        .setTitle('Error!')
        .setDescription("```" + err.stack + "```")
        .setTimestamp()
        .setColor("RED")

    log.error(`[Error!] ${err.stack}`)

    webhookClient.send({
        username: "Error logging",
        embeds: [errEmbed]
    })

});

client.login(process.env.BOT_TOKEN);
// you shouldnt export the client!!
// when you try to import it, node will run the file, launching a shard/bot
//! export default client;
