import Eris from "eris";
import { IKomvosEvent, KomvosClient } from "types";
import EmbedBuilder from "lib/EmbedBuilder";
import { GetBanBroadcast, GetGuildActiveNetwork } from "lib/resourceRepo";

class GuildMemberAdd implements IKomvosEvent {
  constructor(private client: KomvosClient) {}

  public async run(args): Promise<void> {
    const guild = args[0] as Eris.Guild;
    const member = args[1] as Eris.Member;

    const network = await GetGuildActiveNetwork(guild.id);

    if (!network) return;

    const settings = await this.client.repo.GetGuildClientSettings(guild.id);

    const channel = this.client.repo.GetGuildChannel(
      guild,
      settings.channelId,
      true
    );

    const banBroadcast = await GetBanBroadcast(network.id, member.id);

    if (!banBroadcast) return;

    const description = `> ${banBroadcast.reason || "No reason provided."}\n\n`;
    const fields = [
      { name: "Report Type", value: banBroadcast.report_type },
      { name: "Banned User", value: banBroadcast.banned_tag, inline: true },
      { name: "User ID", value: banBroadcast.banned_id, inline: true },
      { name: "Broadcast date", value: banBroadcast.created_at },
    ];
    const embed = new EmbedBuilder({
      color: 16763904,
      description,
      fields,
      footer: { text: `Network ID: ${network.uuid}` },
      image: { url: member.avatarURL, height: 50, width: 50 },
      title: "Reported Network User",
    }).sendable;

    await channel.createMessage({ embed });
  }
}

export default GuildMemberAdd;
