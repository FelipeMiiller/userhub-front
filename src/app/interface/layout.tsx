import Header from './components/header';

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      {children}
    </div>
  );
}
