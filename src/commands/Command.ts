import { BasicMessage, SuccessfulParsedMessage } from "discord-command-parser";
import Eris from "eris";
import { ICommandConfig, KomvosClient, Settings } from "types";

abstract class Command {
  public config: ICommandConfig;
  public cooldowns: Set<string>;

  constructor(protected client: KomvosClient, config: ICommandConfig) {
    this.cooldowns = new Set();
    this.config = {
      name: config.name,
      description: config.description || "No information specified.",
      usage: config.usage || "No usage specified.",
      category: config.category || "Information",
      cooldown: config.cooldown || 1000,
      requiredPermission: config.requiredPermission,
    };
  }

  public setCooldown(guild: Eris.Guild): void {
    this.cooldowns.add(guild.id);

    setTimeout(() => {
      this.cooldowns.delete(guild.id);
    }, this.config.cooldown);
  }

  public async canRun(
    guild: Eris.Guild,
    message: Eris.Message
  ): Promise<boolean> {
    const onCooldown = this.cooldowns.has(guild.id);
    const hasPermission = message.member
      ? message.member.permissions.has(this.config.requiredPermission)
      : false;

    if (!hasPermission || onCooldown) {
      await message.channel.createMessage(
        !hasPermission
          ? "You do not have permission to run this command."
          : "You are on cooldown for this command."
      );

      return false;
    }

    return true;
  }

  public async respond(
    channel: Eris.TextableChannel,
    message: Eris.MessageContent
  ): Promise<Command> {
    await channel.createMessage(message);

    return this;
  }

  public abstract run(
    parsedCommand: SuccessfulParsedMessage<BasicMessage>,
    message: Eris.Message,
    settings: Settings
  ): Promise<void>;

  public toString(): string {
    return `⮩ \`${this.config.usage}\`\n${this.config.description || ""} (_${
      this.config.requiredPermission
    }_).`;
  }
}

export default Command;
