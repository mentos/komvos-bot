import Eris from "eris";
import { IKomvosEvent } from "types";
import { DeleteGuildSettings } from "lib/resourceRepo";

class GuildDelete implements IKomvosEvent {
  public async run(args): Promise<void> {
    const guild = args[0] as Eris.Guild;

    await DeleteGuildSettings(guild.id);
  }
}

export default GuildDelete;
