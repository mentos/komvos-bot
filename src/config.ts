import { KomvosConfig } from "types";

require("dotenv").config();

const { camelize } = require("./utils");

const config = {
  defaultClientSettings: {
    allowInvites: false,
    broadcasts: "mutual",
    channelId: "",
    prefix: "k!",
  },
  ...Object.keys(process.env)
    .filter((key) => /^KOMVOS_/.test(key))
    .reduce((obj, key) => {
      const _k = camelize(key.replace("KOMVOS_", ""));
      return {
        ...obj,
        [_k]: process.env[key],
      };
    }, {}),
} as KomvosConfig;

export default config;
