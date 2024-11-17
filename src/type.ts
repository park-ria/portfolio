export interface SkillType {
  title: string;
  content: string;
}

export interface ProjectType {
  name: string;
  period: string;
  site?: string;
  position: string;
  skill?: SkillType[];
  content?: string;
  skillIcon: string[];
}

export interface CareerType {
  orderNum: string;
  company: string;
  period: string;
  project: ProjectType[];
}
