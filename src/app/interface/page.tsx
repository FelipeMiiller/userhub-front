import { ColorModeSwitcher } from 'src/components/color-mode-switcher';
import { UserProfileCard } from './componets/card';

export default async function InterfacePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Header with theme toggle */}
      <header className="flex justify-end p-4 w-full">
        <ColorModeSwitcher className="w-10 h-10" />
      </header>
      {/* Main content */}
      <main className="flex flex-1 justify-center items-center p-4">
        <UserProfileCard />
      </main>
    </div>
  );
}
