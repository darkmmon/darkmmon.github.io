import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type PostFrontmatter = {
  title?: string;
  date?: string;
  tags?: string[];
  [key: string]: unknown;
};

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'posts');

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getAllPosts() {
  const slugs = getAllSlugs();
  const posts = slugs.map((slug) => {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
    const mdPath = path.join(postsDirectory, `${slug}.md`);
    const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    const content = fs.readFileSync(fullPath, 'utf8');
    const { data, content: body } = matter(content);
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      excerpt: body.substring(0, 300),
    };
  });
  // sort by date if available
  posts.sort((a, b) => {
    const da = a.frontmatter?.date ?? '';
    const db = b.frontmatter?.date ?? '';
    return da > db ? -1 : da < db ? 1 : 0;
  });
  return posts;
}

export async function getPostBySlug(slug: string): Promise<{
  slug: string;
  frontmatter: PostFrontmatter;
  body: string;
}> {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fullPath || !fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${slug}`);
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);
  return {
    slug,
    frontmatter: frontmatter as PostFrontmatter,
    body: content,
  };
}
