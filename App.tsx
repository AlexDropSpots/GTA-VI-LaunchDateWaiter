import React from 'react';
import Countdown from './components/Countdown';
import LeonidaNews from './components/LeonidaNews';
import { Palmtree, Gamepad2, AlertTriangle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen w-full bg-vice-gradient relative overflow-x-hidden flex flex-col">
        {/* Background Overlay Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        
        {/* Palm Trees Decoration (SVG simulation) */}
        <div className="absolute bottom-0 left-0 text-black/20 w-64 h-64 -mb-12 -ml-12 pointer-events-none hidden md:block">
            <Palmtree className="w-full h-full" />
        </div>
        <div className="absolute top-20 right-0 text-pink-900/20 w-96 h-96 -mr-24 pointer-events-none hidden lg:block rotate-12">
             <Palmtree className="w-full h-full" />
        </div>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        
        {/* Header */}
        <header className="mb-12 text-center space-y-4">
            <div className="inline-flex items-center justify-center space-x-2 bg-pink-600/20 border border-pink-500/50 px-4 py-1.5 rounded-full mb-4">
                <span className="animate-pulse w-2 h-2 bg-pink-500 rounded-full"></span>
                <span className="text-pink-200 text-xs font-bold tracking-widest uppercase">Hyping Up For Release</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-heading font-bold text-white tracking-tighter drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">GTA</span>
              <span className="text-pink-500 ml-4">VI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto font-light">
              Welcome to the longest wait in gaming history. 
              <span className="block text-sm mt-2 opacity-70">Experience the next evolution of the open world experience.</span>
            </p>
        </header>

        {/* Countdown Section */}
        <Countdown />

        {/* AI Content Section */}
        <LeonidaNews />

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/5 py-6">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <div className="flex items-center space-x-2">
                    <Gamepad2 className="w-4 h-4" />
                    <span>Fan-made site. Not affiliated with Rockstar Games.</span>
                </div>
                <span className="hidden md:block w-px h-3 bg-gray-700"></span>
                <span className="text-pink-400/80">Made by @Soytimes</span>
            </div>
            
            <div className="flex items-center space-x-6">
                <a href="#" className="hover:text-pink-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-pink-400 transition-colors">Terms</a>
                <div className="flex items-center space-x-1 text-yellow-600/80">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Dates are speculative</span>
                </div>
            </div>
          </div>
      </footer>
    </div>
  );
}

export default App;