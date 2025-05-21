
import { useState, useEffect } from 'react';
import { Copy, Key, ExternalLink, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ApiKey, useApp } from '@/context/AppContext';
import { generateUniquePattern } from '@/utils/aiEffects';

interface ApiKeyCardProps {
  apiKey: ApiKey;
}

const AnimatedApiCard: React.FC<ApiKeyCardProps> = ({ apiKey }) => {
  const { copyApiKey, copyExportCommand, deleteApiKey, categories } = useApp();
  const [patternStyle, setPatternStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const categoryName = categories.find(c => c.id === apiKey.categoryId)?.name || 'Uncategorized';
  const keyPattern = apiKey.key.slice(0, 4) + '••••' + apiKey.key.slice(-4);

  useEffect(() => {
    // Generate unique visual pattern based on the key
    const pattern = generateUniquePattern(apiKey.key);
    setPatternStyle({
      backgroundImage: pattern,
    });
    
    // Animate in
    setTimeout(() => setIsVisible(true), Math.random() * 300);
  }, [apiKey.key]);
  
  const handleCopyKey = () => {
    copyApiKey(apiKey.key);
    toast('API Key copied', {
      description: `${apiKey.displayName} is now in your clipboard`,
    });
  };

  const handleCopyExport = () => {
    copyExportCommand(apiKey.name, apiKey.key);
    toast('Export command copied', {
      description: `Export command for ${apiKey.displayName} is now in your clipboard`,
    });
  };

  const handleDeleteKey = () => {
    deleteApiKey(apiKey.id);
  };

  return (
    <div 
      className={`api-card relative overflow-hidden group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={patternStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-0"></div>
      
      {/* Animated border */}
      <div className={`absolute inset-0 bg-transparent rounded-md ${isHovering ? 'border border-brand-purple/50' : ''}`}>
        <div className={`absolute top-0 left-0 w-full h-full overflow-hidden ${isHovering ? 'animate-pulse' : ''}`}>
          <div className="w-3 h-3 bg-brand-purple/30 rounded-full absolute -top-1 -left-1"></div>
          <div className="w-3 h-3 bg-brand-purple/30 rounded-full absolute -bottom-1 -right-1"></div>
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <h3 className="font-medium text-xs text-white truncate max-w-[130px]">{apiKey.displayName}</h3>
            <span className="text-[10px] text-white/50">{categoryName}</span>
          </div>
          <div className="flex space-x-1">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5 text-white/60 hover:text-white hover:bg-white/10"
              onClick={handleCopyKey}
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-5 w-5 text-white/60 hover:text-white hover:bg-white/10"
              onClick={handleDeleteKey}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="text-white/80 text-[10px] font-mono bg-white/5 px-1 py-0.5 rounded flex items-center mb-1">
          <Key className="h-2 w-2 mr-1 text-brand-purple" />
          <span className="truncate">{keyPattern}</span>
        </div>
        
        {apiKey.url && (
          <a 
            href={apiKey.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-white/60 hover:text-brand-purple flex items-center"
          >
            <ExternalLink className="h-2 w-2 mr-1" />
            <span className="truncate">{apiKey.url}</span>
          </a>
        )}
        
        {/* Quick actions on hover */}
        <div className={`mt-1 transition-all duration-300 transform overflow-hidden ${isHovering ? 'h-6 opacity-100' : 'h-0 opacity-0'}`}>
          <div className="flex items-center justify-between space-x-1">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleCopyExport} 
              className="h-6 text-[10px] w-full hover:bg-white/10"
            >
              Copy Export
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 text-[10px] w-full hover:bg-white/10"
            >
              <Edit className="h-2 w-2 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedApiCard;
