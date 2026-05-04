import guildData from '../data/guild.json';
import type { GuildData } from '../types/guild';

export function useGuildData() {
  // In a real app, this might involve fetching from an API
  // For now, we use the static JSON
  const data: GuildData = guildData as GuildData;

  return {
    guild: data.guild,
    members: data.members,
    food: data.food,
    leveling: data.leveling,
    tutorials: data.tutorials,
    glossary: data.glossary,
    buildTips: data.buildTips,
    gallery: data.gallery,
    leaders: data.members.filter(m => m.role === 'Lider'),
    others: data.members.filter(m => m.role !== 'Lider'),
  };
}
