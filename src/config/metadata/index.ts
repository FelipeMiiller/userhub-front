import { Metadata } from 'next';
import { envPublic } from '../env.public';

const appUrl = envPublic.appUrl;
export const companyName = 'UserHub Inc.';

export const staticMetadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: `${companyName} - Portal de Usuários`,

  description: `Portal de gerenciamento de usuários da ${companyName}`,
  keywords: ['next.js', 'template', 'typescript', 'react', 'pt-br'],
  authors: [{ name: companyName }],
  openGraph: {
    type: 'website',

    locale: 'pt_BR',
    url: appUrl,
    siteName: companyName,
    title: `${companyName} - Portal de Usuários`,
    description: 'Um template moderno e rico em recursos para Next.js',
    images: [
      {
        url: '/og-image-pt.jpg',
        width: 1200,
        height: 630,
        alt: 'Template Next.js',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${companyName} - Portal de Usuários`,
    description: `Portal de gerenciamento de usuários da ${companyName}`,
    images: ['/twitter-image-pt.jpg'],
  },
  alternates: {
    canonical: appUrl,
    languages: {
      'pt-BR': appUrl + '/pt',
      'en-US': appUrl + '/en',
    },
  },
};
