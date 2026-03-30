import { View } from '../types';
import { cn } from '../lib/utils';

interface HeaderProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-surface fixed w-full top-0 z-50 border-b border-surface-container">
      <div className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto w-full">
        <div 
          className="text-2xl font-black text-on-surface tracking-tighter font-headline cursor-pointer"
          onClick={() => onViewChange('generator')}
        >
          QR Flow
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onViewChange('generator')}
            className={cn(
              "font-headline font-bold text-sm tracking-tight transition-colors active:scale-95 duration-200",
              currentView === 'generator' 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Generator
          </button>
          <button
            onClick={() => onViewChange('customizer')}
            className={cn(
              "font-headline font-bold text-sm tracking-tight transition-colors active:scale-95 duration-200",
              currentView === 'customizer' 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Customizer
          </button>
        </nav>
        <div className="md:hidden">
          <button className="text-on-surface">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
