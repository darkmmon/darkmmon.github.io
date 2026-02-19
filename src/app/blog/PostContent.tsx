'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const MDXRemote = dynamic(
  () => import('next-mdx-remote').then((mod) => mod.MDXRemote),
  { ssr: false },
);

export default function PostContent({ mdxSource }: { mdxSource: any }) {
  return (
    <div className="post-content prose max-w-none">
      {/* MDXRemote is loaded only on the client to avoid hook/runtime issues */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <MDXRemote {...mdxSource} />
    </div>
  );
}
