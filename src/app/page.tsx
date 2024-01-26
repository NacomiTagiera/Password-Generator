import { Card } from '@/components/Card';
import { Header } from '@/components/Header';
import { PasswordGenerator } from '@/components/PasswordGenerator';

export default function Home() {
  return (
    <Card>
      <Header>Password Generator</Header>
      <PasswordGenerator />
    </Card>
  );
}
