export const envPublic = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  revalidateSeconds: Number(process.env.NEXT_PUBLIC_REVALIDATE_SECONDS || 5),
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005',
};
