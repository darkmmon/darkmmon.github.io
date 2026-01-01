import React from 'react';
import Container from '../components/ui/container';
import Section from '../components/ui/section';
import Card from '../components/ui/card';
import Badge from '../components/ui/badge';
import InfoBox from './components/InfoBox';
import Button from '../components/ui/button';
import Link from 'next/link';
import Header from './components/header';
import Text from '@/components/ui/text';
import AnimatedHello from './components/AnimatedHello';

type Project = {
  title: string;
  description: string;
  tags?: string[];
  url?: string;
};

const projects: Project[] = [
  {
    title: 'Super Tic Tac Toe',
    description: 'Play with your friends, or against a bot!',
    tags: ['React', 'Typescript'],
    url: '/game',
  },
  {
    title: 'Blog Theme (Next.js)',
    description:
      'A fast, readable blog theme with good SEO and accessible components.',
    tags: ['Next.js', 'SEO', 'Accessibility'],
    url: '#',
  },
  {
    title: 'Interactive Portfolio',
    description: "This live portfolio page. It's amazing, right?",
    tags: ['Design', 'UX'],
    url: '#',
  },
];

export default function Page() {
  return (
    <Container>
      <div className="h-[100vh] w-full item-center content-center">
        <AnimatedHello />
        <InfoBox />
      </div>

      <Section title="Selected projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card
              key={p.title}
              className="flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex-1">
                <Text className="text-lg font-semibold">{p.title}</Text>
                <Text className="mt-2 text-slate-600 text-sm">
                  {p.description}
                </Text>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {p.tags?.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Link href={p.url ?? '#'}>
                    <Button variant="ghost">Explore</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Skills & tools">
        <div className="flex flex-wrap gap-2">
          {[
            'TypeScript',
            'React',
            'Next.js',
            'Tailwind',
            'Node.js',
            'Design systems',
          ].map((s) => (
            <Badge key={s} className="px-3 py-1">
              {s}
            </Badge>
          ))}
        </div>
      </Section>

      <Section title="Say hi">
        <Card className="p-6">
          <Text className="text-slate-600 mb-4">
            I&apos;m interested in curious front-end work and small product
            experiments. Email me at{' '}
            <a href="mailto:hello@example.com" className="text-teal-600">
              hello@example.com
            </a>{' '}
            or find me on{' '}
            <a href="#" className="text-teal-600">
              GitHub
            </a>
            .
          </Text>

          <div className="flex gap-3">
            <Link href="mailto:hello@example.com">
              <Button>Contact</Button>
            </Link>
            <Link href="https://github.com/darkmmon">
              <Button variant="ghost">View projects</Button>
            </Link>
          </div>
        </Card>
      </Section>

      <footer className="mt-12 py-6 border-t border-slate-100 text-sm text-slate-500">
        © {new Date().getFullYear()} Darkmmon — built with Next.js
      </footer>
    </Container>
  );
}
