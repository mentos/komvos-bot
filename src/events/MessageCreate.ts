import Eris from "eris";
import parser, {
  BasicMessage,
  FailedParsedMessage,
  SuccessfulParsedMessage,
} from "discord-command-parser";
import { IKomvosEvent, KomvosClient, Settings } from "types";
import Command from "commands/Command";

type ParsedMessage =
  | FailedParsedMessage<BasicMessage>
  | SuccessfulParsedMessage<BasicMessage>;

class MessageCreate implements IKomvosEvent {
  constructor(private client: KomvosClient) {}

  public async run(args: any): Promise<void> {
    const message: Eris.Message = args;

    if (message?.channel?.type !== 0 ?? 1) return;

    const settings: Settings = await this.client.repo.GetGuildClientSettings(
      message.guildID
    );

    const parsed: ParsedMessage = parser.parse(message, settings.prefix, {
      allowBots: false,
      allowSpaceBeforeCommand: false,
      ignorePrefixCase: false,
    });

    if (!parsed.success) return;

    const command = this.client.commands.get(parsed.command) as Command;

    if (!command) return;

    const channel = message.channel as Eris.GuildChannel;

    if (!command.canRun(channel.guild, message)) return;

    await command.run(parsed, message, settings);

    command.setCooldown(channel.guild);
  }
}

export default MessageCreate;
