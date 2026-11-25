export interface SkillEntry {
  name: string;
  iconClass: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconClass: string;
  layout: 'tags' | 'tools';
  items: SkillEntry[];
}
