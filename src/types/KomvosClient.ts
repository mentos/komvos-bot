import Command from "commands/Command";
import Eris from "eris";
import { Settings } from ".";

type KomvosClient = Eris.Client & {
  Message: Eris.Message & {
    readonly guild: Eris.Guild;
  };
  commands: Map<string, Command>;
  guildsSettings: Map<[guildId: string], Settings>;
  repo: {
    GetGuild: any;
    GetGuildChannel: any;
    GetGuildClientSettings: any;
    GetGuildsMutualMembers: any;
    SetGuildClientSettings: any;
  };
};

export default KomvosClient;
