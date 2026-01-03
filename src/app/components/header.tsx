import ThemeToggle from '../../components/ui/theme-toggle';
import Button from '../../components/ui/button';
import Link from 'next/link';
import Text from '@/components/ui/text';
export default function Header() {
  return (
    <header className="pt-8 pb-8 fixed w-full">
      <div className="flex flex-row justify-around w-full">
        <div>
          <Link href="https://github.com/darkmmon">
            <Button variant="ghost">
              <Text>View projects</Text>
            </Button>
          </Link>
          <Link href="mailto:hello@example.com">
            <Button variant="ghost">
              <Text>Contact</Text>
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost">
              <Text>Chat</Text>
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
