import { Command } from "commander";

export const program = new Command();

program
    .option("--mode <mode>", 'modo de trabajo de server', "production")
    .parse()