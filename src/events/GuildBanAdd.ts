import Eris from "eris";
import { IKomvosEvent, KomvosClient } from "types";
import BroadcastReport from "lib/BroadcastBanReport";

class GuildBanAdd implements IKomvosEvent {
  constructor(private client: KomvosClient) {}

  public async run(args): Promise<void> {
    const guild = args[0] as Eris.Guild;
    const user = args[1] as Eris.User;

    // @ts-ignore
    await BroadcastReport({
      bannedUser: user,
      client: this.client,
      guild,
    });
  }
}

export default GuildBanAdd;
