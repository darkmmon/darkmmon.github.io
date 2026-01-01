import Card from '../../components/ui/card';
import Text from '@/components/ui/text';
import Badge from '@/components/ui/badge';

export default function InfoBox() {
  return (
    <Card className="flex flex-col items-center">
      <Text className="text-4xl font-bold tracking-tight">Darkmmon</Text>
      <div className="my-2 flex gap-3">
        <Badge>AI Developer</Badge>
      </div>
      <div>
        <Text>Welcome to my page!</Text>
      </div>
      <div className="flex gap-3"></div>
    </Card>
  );
}
