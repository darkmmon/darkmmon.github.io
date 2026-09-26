import ThemeToggle from '../../components/ui/theme-toggle';
import Button from '../../components/ui/button';
import Link from 'next/link';
import Text from '@/components/ui/text';
export default function Header() {
  return (
    <header className="pt-8 pb-8 fixed w-full">
      <div className="flex flex-row justify-around w-full">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="font-mono text-lg dark:text-white text-gray-800">
                {'<'} / {'>'}
              </span>
              <span className="font-mono text-sm dark:text-white text-gray-800">
                darkmmon
              </span>
            </div>
          </Link>
        </div>
        <div>
          <Link href="https://github.com/darkmmon">
            <Button variant="ghost">
              <Text>View projects</Text>
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost">
              <Text>Contact</Text>
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost">
              <Text>Chat</Text>
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost">
              <Text>Blog</Text>
            </Button>
          </Link>
          <Link href="/drinking">
            <Button variant="ghost">
              <Text>Drinking</Text>
            </Button>
          </Link>
        </div>
        <div>
          <div className="text-xs dark:text-white text-gray-700">Theme</div>
          <div className="mt-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
