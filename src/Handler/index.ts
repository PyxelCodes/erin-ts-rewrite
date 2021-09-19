import { Erin } from "..";
import { glob } from 'glob'
import { promisify } from 'util'
import log from '../logger'

const globPromise = promisify(glob);

export default async (client: Erin.ExtendedClient) => {
	const eventFiles = await globPromise(`${process.cwd()}/Events/*/*.js`);
	eventFiles.forEach((file: string) => {
		file = file.replace(/\.js$/, "");
		require(file)
		log.warn(`Event file: ${file}.js loaded.`)
	});
	log.debug(`All event files loaded!`)

	const arrayOfSlashCommands = [];
	const slashCommands = await globPromise(`${process.cwd()}/Commands/*/*.js`);
	slashCommands.map((value: any) => {
		const file = require(value);
		if (!file?.name) return;
		client.slashCommands.set(file.name, file);
		log.warn(`Slash command file: ${JSON.stringify(file, null, 4)} loaded.`);
		arrayOfSlashCommands.push(file);
	});
	log.debug(`Slash commands loaded!`)

	client.on("ready", async () => {
		//await client.guilds.cache.get("add development guild name").commands.set(arrayOfSlashCommands);
		//await client.application.commands.set(arrayOfSlashCommands);
		//log.debug(`Slash Commands Registered!`)
	});
};
