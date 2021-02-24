type MemberPermission = "administrator" | "banMembers" | "sendMessage";

export interface ICommandConfig {
  category?: string;
  cooldown: number;
  description?: string;
  name: string;
  requiredPermission: MemberPermission;
  usage?: string;
}

export default ICommandConfig;
