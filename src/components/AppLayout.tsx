import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import CinematicExperience from './cosmic/CinematicExperience';

const AppLayout: React.FC = () => {
  // App context available for future global state needs
  useAppContext();

  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      <CinematicExperience />
    </main>
  );
};

export default AppLayout;
