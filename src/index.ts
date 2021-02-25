import prexit from "prexit";
import { IKomvosEvent, KomvosEventName } from "types";
import client from "./client";
import * as Events from "./events";
import { sql } from "./db";

for (const kEvent in KomvosEventName) {
  const eventKlassName = kEvent.charAt(0).toUpperCase() + kEvent.slice(1);
  const event: IKomvosEvent = new Events[eventKlassName](client);

  client.on(kEvent, (...args: any) => event.run(...args));
}

client.on("ready", () => console.log("Ready!"));
client.connect();

prexit(async () => await sql.end({ timeout: 5 }));
