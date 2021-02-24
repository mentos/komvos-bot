import Eris from "eris";
import { IKomvosEvent, KomvosClient } from "types";
import BroadcastBanRevokeReport from "lib/BroadcastBanRevokeReport";

class GuildBanRemove implements IKomvosEvent {
  constructor(private client: KomvosClient) {}

  public async run(args): Promise<void> {
    const guild = args[0] as Eris.Guild;
    const user = args[1] as Eris.User;

    const settings = await this.client.repo.GetGuildClientSettings(guild.id);
    const channel = this.client.repo.GetGuildChannel(
      guild,
      settings.channelId,
      true
    );

    await BroadcastBanRevokeReport({
      bannedUserId: user.id,
      channel,
      client: this.client,
      guild,
      reason: "",
    });
  }
}

export default GuildBanRemove;
