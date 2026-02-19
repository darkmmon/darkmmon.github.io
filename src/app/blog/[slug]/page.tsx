import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import PostContent from '../PostContent';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return (
    <article className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">{post.frontmatter.title}</h1>
      <div className="text-sm text-muted-foreground mb-6">
        {post.frontmatter.date}
      </div>
      {/* MDX rendering happens in a client component */}
      {/* @ts-ignore */}
      <PostContent mdxSource={post.mdxSource} />
    </article>
  );
}
