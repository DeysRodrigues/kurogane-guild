export interface GuildMember {
  id: string;
  name: string;
  role: 'Lider' | 'Vice lider' | 'Synthetisist' | 'Ferreiro' | 'Membro';
  class: string;
  subWeapon?: string;
  favoriteSkills?: string[];
  roleType?: 'DPS' | 'Tank' | 'Support' | 'Farmer';
  records?: {
    type: 'Damage';
    value: string;
    skill: string;
  };
  quote: string;
  joinDate: string;
  colors: {
    primary: string;
    secondary: string;
    text?: string;
  };
  effects?: (string | { type: string, emojis: string[] })[];
  images: {
    main: string;
    weapon?: string;
    pose?: string;
  };
}

export interface FoodItem {
  id: string;
  name: string;
  code: string;
  description: string;
}

export interface LevelingRange {
  levelRange: string;
  location: string;
  description: string;
}

export interface Tutorial {
  id: string;
  title: string;
  content: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface BuildTip {
  class: string;
  stats: string;
  skills: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  description?: string;
}

export interface GuildData {
  guild: {
    name: string;
    discord: string;
    description: string;
  };
  members: GuildMember[];
  food: FoodItem[];
  leveling: LevelingRange[];
  tutorials: Tutorial[];
  glossary: GlossaryItem[];
  buildTips: BuildTip[];
  gallery: GalleryItem[];
}
