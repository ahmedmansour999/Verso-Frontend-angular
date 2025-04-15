import { Certifications } from "./certifications";
import { Education } from "./education";
import { Experience } from "./experience";
import { Project } from "./project";

export interface Portfolio {
  summary: string;
  graduate: Date;
  educations: Education[];
  projects: Project[];
  certifications: Certifications[];
  experiences: Experience[];
  user_id? : number ;
}
