import { GuildChannel } from './guild';
import { PrivateChannel } from './private';

export { GuildChannel } from './guild';
export { PrivateChannel } from './private';
export type Channel = GuildChannel | PrivateChannel;
