interface AddProjectParams {
  name: string;
  description: string;
  image?: string;
  url?: string;
  github?: string;
  techStack?: string[];
  category?: string;
  featured: boolean;
}
