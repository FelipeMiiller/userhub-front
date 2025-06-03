// Página inicial - componente de servidor
import { ReactLogo } from '@/components/react-logo';
import { Button } from '@/components/ui/button';
import { hrefs } from '@/config/hrefs';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div
      data-testid="home-page"
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
    >
      <div className="flex flex-col items-center gap-8">
        <ReactLogo size={140} />

        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">UserHub</h1>
          <p className="text-xl text-muted-foreground">Sistema de Gestão de Usuários</p>
        </div>

        <Button size="lg" className="gap-2 w-full max-w-xs mt-6" asChild>
          <Link href={hrefs.auth.signIn}>
            Entrar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
