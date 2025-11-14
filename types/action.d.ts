interface AuthCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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

interface UpdateProjectParams {
  name?: string;
  description?: string;
  image?: string;
  url?: string;
  github?: string;
  techStack?: string[];
  category?: string;
  featured?: boolean;
}

interface AddBlogParams {
  title: string;
  description: string;
  image?: string;
}

interface UpdateBlogParams {
  title?: string;
  description?: string;
  image?: string;
}