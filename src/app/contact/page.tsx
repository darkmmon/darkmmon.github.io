import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          I&apos;d love to hear from you — whether it&apos;s a question, project
          idea, or feedback.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Connect</h2>
          <ul className="space-y-2 list-none p-0">
            <li>
              <a
                className="text-blue-600 dark:text-blue-400 underline"
                href="mailto:ivanyiutin@gmail.com"
              >
                Email - ivanyiutin@gmail.com
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-400 underline"
                href="https://github.com/darkmmon"
              >
                GitHub — github.com/darkmmon
              </a>
            </li>
            <li>
              <a
                className="text-blue-600 dark:text-blue-400 underline"
                href="https://www.linkedin.com/in/ivan-yiu-69105727b/"
              >
                LinkedIn — Ivan Yiu
              </a>
            </li>
            {/* <li>
              <a
                className="text-blue-600 dark:text-blue-400 underline"
                href="https://instagram.com/yourhandle"
              >
                Instagram — @yourhandle
              </a>
            </li> */}
            <li>
              <a
                className="text-blue-600 dark:text-blue-400 under line"
                href="https://discord.com/users/ilv_Rem"
              >
                Discord — darkmmon
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Other ways</h2>
          <p className="mb-2">
            Check out my projects on{' '}
            <a
              className="text-blue-600 dark:text-blue-400 underline"
              href="https://github.com/darkmmon"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
