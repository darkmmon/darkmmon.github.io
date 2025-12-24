import Card from '../../components/ui/card';

import Badge from '@/components/ui/badge';

export default function InfoBox() {
  return (
    <Card className="flex flex-col items-center">
      <h1 className="text-4xl font-bold tracking-tight">Darkmmon</h1>
      <div className="my-2 flex gap-3">
        <Badge>AI Developer</Badge>
      </div>
      <div>
        <p>Welcome!</p>
      </div>
      <div className="flex gap-3"></div>
    </Card>
  );
}
