import EmbedBuilder from "lib/EmbedBuilder";
import Eris from "eris";
import { KomvosClient } from "types";
import { isEmpty } from "utils";
import Command from "./Command";

class Help extends Command {
  constructor(client: KomvosClient) {
    super(client, {
      category: "Information",
      cooldown: 1000,
      description: "Show this message",
      name: "ping",
      requiredPermission: "banMembers",
      usage: "`k!help`",
    });
  }

  public async run(_, message: Eris.Message): Promise<void> {
    const embed: Eris.Embed = new EmbedBuilder({ command: true })
      .title("Available bot commands:")
      .description(
        [...this.client.commands]
          .filter(([_, cmd]) => !isEmpty(cmd.config.usage))
          .sort(([a, b]) => (a[0] > b[0] ? 1 : b[0] > a[0] ? -1 : 0))
          .map(([_, cmd]) => cmd.toString())
          .join("\n\n")
      )
      .timestamp().sendable;

    await super.respond(message.channel, { embed });
  }
}

export default Help;
