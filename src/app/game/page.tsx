import React from 'react';
import Container from '../../components/ui/container';
import InfoBox from '../components/InfoBox';
import Button from '../../components/ui/button';
import Link from 'next/link';
import AnimatedHello from '../components/AnimatedHello';
import Card from '../../components/ui/card';
import Badge from '../../components/ui/badge';
type Project = {
  title: string;
  description: string;
  tags?: string[];
  url?: string;
};

export default function Page() {
  return (
    <Container>
      <div className="h-[100vh] w-full item-center content-center">
        <Card className="flex flex-row items-center justify-center gap-4">
          <Link href="/game/1p">
            <Button>One Player</Button>
          </Link>
          <Link href="/game/2p">
            <Button>Two Player</Button>
          </Link>
        </Card>
      </div>
    </Container>
  );
}
