import React from 'react'
import Container from '../components/ui/container'
import Section from '../components/ui/section'
import Card from '../components/ui/card'
import Badge from '../components/ui/badge'
import Button from '../components/ui/button'
import ThemeToggle from '../components/ui/theme-toggle'

type Project = {
  title: string
  description: string
  tags?: string[]
  url?: string
}

const projects: Project[] = [
  {
    title: 'Minimal Chess Trainer',
    description: 'Practice key endgames and tactics with a lightweight trainer and hint system.',
    tags: ['React', 'Typescript', 'AI'],
    url: '#',
  },
  {
    title: 'Blog Theme (Next.js)',
    description: 'A fast, readable blog theme with good SEO and accessible components.',
    tags: ['Next.js', 'SEO', 'Accessibility'],
    url: '#',
  },
  {
    title: 'Interactive Portfolio',
    description: 'This live portfolio page — responsive and easy to adapt.',
    tags: ['Design', 'UX'],
    url: '#',
  },
]

export default function Page() {
  return (
    <Container>
      <header className="pt-12 pb-6">
        <div className="flex items-start justify-between flex-col sm:flex-row gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Darkmmon</h1>
            <p className="mt-2 text-slate-600 max-w-2xl">I build small web apps and playful UIs. I care about accessibility, performance, and delightful micro-interactions.</p>
            <div className="mt-4 flex gap-3">
              <Button>View projects</Button>
              <a href="mailto:hello@example.com" className="inline-flex items-center px-4 py-2 rounded-md border border-slate-200 text-sm">Contact</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="text-sm text-slate-500">
              <div className="mb-2">Based in: Anywhere</div>
              <div>Available for freelance & collaborations</div>
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <Section title="Selected projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <Card key={p.title} className="flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{p.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {p.tags?.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <a href={p.url} className="text-teal-600 text-sm">Explore →</a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Skills & tools">
        <div className="flex flex-wrap gap-2">
          {['TypeScript', 'React', 'Next.js', 'Tailwind', 'Node.js', 'Design systems'].map((s) => (
            <span key={s} className="px-3 py-1 bg-slate-100 rounded-full text-sm">{s}</span>
          ))}
        </div>
      </Section>

      <Section title="Say hi">
        <p className="text-slate-600">I'm interested in curious front-end work and small product experiments. Email me at <a href="mailto:hello@example.com" className="text-teal-600">hello@example.com</a> or find me on <a href="#" className="text-teal-600">GitHub</a>.</p>
      </Section>

      <footer className="mt-12 py-6 border-t border-slate-100 text-sm text-slate-500">© {new Date().getFullYear()} Darkmmon — built with Next.js</footer>
    </Container>
  )
}
