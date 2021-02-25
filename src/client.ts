import Eris from "eris";
import KomvosClient from "./types/KomvosClient";

const fs = require("fs");
const path = require("path");

Object.defineProperty(Eris.Channel.prototype, "isGuildTextChannel", {
  get: function () {
    return this.type === 0;
  },
});

Object.defineProperty(Eris.Member.prototype, "tag", {
  get: function () {
    return `${this.username}#${this.discriminator}`;
  },
});

Object.defineProperty(Eris.Member.prototype, "hasPermission", {
  value: function (perm) {
    return this.permission.has(perm);
  },
});

Object.defineProperty(Eris.Message.prototype, "guild", {
  get: function () {
    return this.channel.guild;
  },
});

Object.defineProperty(Eris.User.prototype, "tag", {
  get: function () {
    return `${this.username}#${this.discriminator}`;
  },
});

const config = require("./config");

const client = Eris(config.botToken) as KomvosClient;

client.commands = new Map();
client.guildsSettings = new Map();
client.repo = {
  GetGuild: require("./clientRepo/getGuild")(client),
  GetGuildChannel: require("./clientRepo/getGuildChannel")(client),
  GetGuildClientSettings: require("./clientRepo/getGuildClientSettings")(
    client
  ),
  GetGuildsMutualMembers: require("./clientRepo/getGuildsMutualMembers")(
    client
  ),
  SetGuildClientSettings: require("./clientRepo/setGuildClientSettings")(
    client
  ),
};

const commandsDir = path.normalize(path.join(__dirname, ".", "commands"));
const commandFiles = fs.readdirSync(commandsDir);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

export default client;
