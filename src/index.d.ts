import { Client, Collection } from "discord.js";

export namespace Erin {
    export interface ExtendedClient extends Client {
        emoji: { [name: string]: string }
        events: Collection<string, unknown>
        slashCommands: Collection<string, Command>
    }

    export interface Command {

    }
}

declare global {
    export namespace NodeJS {
        export interface ProcessEnv {
            ERROR_LOG: string
        }
    }
}