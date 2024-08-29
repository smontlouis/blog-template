export type Frontmatter = {
  title: string;
  description: string;
  published: string;
  featured: boolean;
};

export type PostPreview = {
  index: number;
  slug: string;
  frontmatter: Frontmatter;
};
