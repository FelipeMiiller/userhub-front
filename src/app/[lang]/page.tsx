import { ReactLogo } from 'src/components/react-logo';

import { Button } from 'src/components/ui/button';
import { hrefs } from 'src/config/hrefs';
import Link from 'next/link';
import { Locale } from '@/types/i18n-types';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/services/i18n';

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div
      data-testid="home-page"
      className="min-h-screen bg-background flex flex-col items-center justify-center"
    >
      <span data-testid="react-logo">
        <ReactLogo size={128} />
      </span>
      <h1 data-testid="title" className="text-4xl font-bold text-center mt-4">
        {dictionary.home.title}
      </h1>
      <p data-testid="subtitle" className="text-lg text-center text-muted-foreground mb-8">
        {dictionary.common.signInToContinue}
      </p>
      {/* Botão de login */}
      <Button size="lg" className="gap-2" asChild>
        <Link href={hrefs.auth.signIn}>
          {dictionary.common.signIn}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
}
