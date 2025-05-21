
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ApiKeyList from './ApiKeyList';
import AiAssistant from './AiAssistant';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { LayoutGrid, LayoutList, Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const { setSearchQuery } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAiEffects, setShowAiEffects] = useState(true);
  const [particles, setParticles] = useState<{x: number, y: number, size: number, speed: number, opacity: number}[]>([]);

  useEffect(() => {
    // Create floating particle effect in background
    if (showAiEffects) {
      const interval = setInterval(() => {
        setParticles(current => {
          // Remove particles that have faded out
          const filtered = current.filter(p => p.opacity > 0.05);
          
          // Add new particles occasionally
          if (Math.random() > 0.7) {
            const newParticle = {
              x: Math.random() * 100,
              y: Math.random() * 100,
              size: Math.random() * 3 + 1,
              speed: Math.random() * 0.5 + 0.2,
              opacity: Math.random() * 0.3 + 0.1
            };
            return [...filtered, newParticle];
          }
          
          // Update existing particles
          return filtered.map(p => ({
            ...p,
            y: p.y - p.speed,
            opacity: p.opacity * 0.98
          }));
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [showAiEffects]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-screen max-h-[600px] max-w-[800px] mx-auto overflow-hidden rounded-xl border border-white/10 shadow-xl bg-background text-foreground relative">
      {/* Ambient floating particles */}
      {showAiEffects && particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            background: 'radial-gradient(circle, rgba(155,135,245,1) 0%, rgba(155,135,245,0) 70%)'
          }}
        />
      ))}
      
      <Sidebar />
      
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {/* Top control bar */}
        <div className="p-2 border-b border-white/10 flex justify-between items-center">
          <div className="relative flex-1 max-w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/50" />
            <Input
              placeholder="Search API keys..."
              value={searchInput}
              onChange={handleSearchChange}
              className="pl-7 py-1 h-7 bg-white/5 border-white/10 text-xs"
            />
          </div>
          
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-7 w-7 rounded-md ${viewMode === 'grid' ? 'bg-white/10' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`h-7 w-7 rounded-md ${viewMode === 'list' ? 'bg-white/10' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <LayoutList className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className={`h-7 w-7 rounded-md ${showAiEffects ? 'text-brand-purple' : 'text-white/70'}`}
              onClick={() => setShowAiEffects(!showAiEffects)}
              title={showAiEffects ? "Disable AI effects" : "Enable AI effects"}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        
        <ApiKeyList viewMode={viewMode} showEffects={showAiEffects} />
      </div>
      
      {/* AI Assistant */}
      <AiAssistant />
    </div>
  );
};

export default Dashboard;
