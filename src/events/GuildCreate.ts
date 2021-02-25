import Eris from "eris";
import { IKomvosEvent } from "types";
import { UpdateGuildSettings } from "lib/resourceRepo";
import config from "config";

class GuildCreate implements IKomvosEvent {
  public async run(args): Promise<void> {
    const guild = args[0] as Eris.Guild;

    await UpdateGuildSettings(
      guild.id,
      JSON.stringify(config.defaultClientSettings)
    );
  }
}

export default GuildCreate;
