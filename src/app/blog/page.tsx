import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-6">Blog</h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b pb-4">
            <Link href={`/blog/${p.slug}`}>
              <h2 className="text-2xl text-blue-600 hover:underline">
                {p.frontmatter.title ?? p.slug}
              </h2>
            </Link>
            <div className="text-sm text-muted-foreground">
              {p.frontmatter.date}
            </div>
            <p className="mt-2 text-gray-700">{p.excerpt}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
