type KomvosConfig = {
  botToken: string;
  clientId: string;
  clientSecret: string;
  publicKey: string;
  defaultClientSettings: {
    allowInvites: boolean;
    broadcasts: "mutual";
    channelId: string | null;
    prefix: string;
  };
};

export default KomvosConfig;
