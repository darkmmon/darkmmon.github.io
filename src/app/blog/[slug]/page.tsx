import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import PostContent from '../PostContent';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const title = post.frontmatter.title ?? 'Untitled post';
  const date = post.frontmatter.date ?? '';

  return (
    <article className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">{title}</h1>
      <div className="text-sm text-muted-foreground mb-6">{date}</div>
      <PostContent body={post.body} />
    </article>
  );
}
